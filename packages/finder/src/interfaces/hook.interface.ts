import {IClone} from '@eklmv/jscpd-core';

export interface IHook {
	process(clones: IClone[]): Promise<IClone[]>;
}
