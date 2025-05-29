import {IClone, IStatistic} from '@eklmv/jscpd-core';

export interface IReporter {
	report(clones: IClone[], statistic: IStatistic | undefined): void;
}
