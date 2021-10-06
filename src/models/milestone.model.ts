import { Schema, model, Document } from 'mongoose';

export interface IMilestone {
	_id?: string;
	boardID: string;
	title: string;
	startDate: Date;
	endDate: Date;
	actualSituation: string;
	desiredSituation: string;
}

const schema = new Schema<IMilestone>({
	boardID: { type: String, required: true },
	title: { type: String, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: false },
	actualSituation: { type: String, required: true },
	desiredSituation: { type: String, required: false },
});

const Milestone = model<IMilestone>('Milestone', schema);
export { Milestone };
