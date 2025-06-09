import {IStore, type IMapFrame} from '..';

export class MemoryStore implements IStore<IMapFrame> {
  private _namespace: string = '';

  protected values: Record<string, Record<string, Record<string, IMapFrame>>> = {};

  public namespace(namespace: string): void {
    this._namespace = namespace;
    this.values[namespace] = this.values[namespace] || {};
  }

  public get(key: string): Promise<Record<string, IMapFrame>> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (key in this.values[this._namespace]) {
        // @ts-ignore
        resolve(this.values[this._namespace][key]);
      } else {
        reject(new Error('not found'));
      }
    });
  }

  public set(key: string, value: IMapFrame): Promise<Record<string, IMapFrame>> {
    // @ts-ignore
    const prev = this.values[this._namespace][key] || {};
    prev[value.sourceId] = value
    // @ts-ignore
    this.values[this._namespace][key] = prev;
    return Promise.resolve(prev);
  }

  close(): Promise<void> {
    this.values = {};
    return Promise.resolve();
  }
}
