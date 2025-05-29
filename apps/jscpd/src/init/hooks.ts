import {BlamerHook, FragmentsHook, InFilesDetector} from '@eklmv/jscpd-finder';
import {IOptions} from '@eklmv/jscpd-core';

export function registerHooks(options: IOptions, detector: InFilesDetector): void {
  detector.registerHook(new FragmentsHook());
  if (options.blame) {
    detector.registerHook(new BlamerHook());
  }
}
