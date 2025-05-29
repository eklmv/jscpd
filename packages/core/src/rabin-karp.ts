import {IClone, ICloneValidator, IMapFrame, IOptions, IStore, ITokenLocation, IValidationResult} from './interfaces';
import {runCloneValidators} from './validators';
import {ITokensMap} from '.';
import EventEmitter from "eventemitter3";

export class RabinKarp {
  constructor(
    private readonly options: IOptions,
    private readonly eventEmitter: EventEmitter,
    private readonly cloneValidators: ICloneValidator[],
  ) {
  }

  public async run(tokenMap: ITokensMap, store: IStore<IMapFrame>): Promise<IClone[]> {
    // tracking clones during detection, sourceId -> clone
    let trackedClones: Record<string, IClone> = {};
    // resulting clones
    const clones: IClone[] = [];

    const loop = async () => {
      const iteration = tokenMap.next();

      try {
        const mapFrames: Record<string, IMapFrame> = await store.get(iteration.value.id);

        for (const [sourceId, mapFrame] of Object.entries(mapFrames)) {
          if (!trackedClones[sourceId]) {
            trackedClones[sourceId] = RabinKarp.createClone(tokenMap.getFormat(), iteration.value, mapFrame);
          } else {
            trackedClones[sourceId] = RabinKarp.enlargeClone(trackedClones[sourceId], iteration.value, mapFrame);
          }
        }

        // if sourceId of tracked clone is not in store, then clone is finished
        for (const [sourceId, clone] of Object.entries(trackedClones)) {
          if (!mapFrames[sourceId]) {
            if (this.validate(clone)) {
              clones.push(clone);
            }
            delete trackedClones[sourceId];
          }
        }
      } catch {
        for (const clone of Object.values(trackedClones)) {
          if (this.validate(clone)) clones.push(clone);
        }

        trackedClones = {};
      } finally {
        // Now we track frames from all sources, so add them all to store
        if (iteration.value.id) {
          await store.set(iteration.value.id, iteration.value);
        }

        if (!iteration.done) {
          await loop();
        }
      }
    };

    await loop();
    return clones;
  }

  private validate(clone: IClone): boolean {

    const validation: IValidationResult = runCloneValidators(clone, this.options, this.cloneValidators);

    if (validation.status) {
      this.eventEmitter.emit('CLONE_FOUND', {clone})
    } else {
      this.eventEmitter.emit('CLONE_SKIPPED', {clone, validation})
    }
    return validation.status;
  }

  private static createClone(format: string, mapFrameA: IMapFrame, mapFrameB: IMapFrame): IClone {
    return {
      format,
      foundDate: new Date().getTime(),
      duplicationA: {
        sourceId: mapFrameA.sourceId,
        start: mapFrameA?.start?.loc?.start as ITokenLocation,
        end: mapFrameA?.end?.loc?.end as ITokenLocation,
        range: [mapFrameA.start.range[0], mapFrameA.end.range[1]],
      },
      duplicationB: {
        sourceId: mapFrameB.sourceId,
        start: mapFrameB?.start?.loc?.start as ITokenLocation,
        end: mapFrameB?.end?.loc?.end as ITokenLocation,
        range: [mapFrameB.start.range[0], mapFrameB.end.range[1]],
      },
    }
  }

  private static enlargeClone(clone: IClone, mapFrameA: IMapFrame, mapFrameB: IMapFrame): IClone {
    clone.duplicationA.range[1] = mapFrameA.end.range[1];
    clone.duplicationA.end = mapFrameA?.end?.loc?.end as ITokenLocation;
    clone.duplicationB.range[1] = mapFrameB.end.range[1];
    clone.duplicationB.end = mapFrameB?.end?.loc?.end as ITokenLocation;
    return clone;
  }

}


