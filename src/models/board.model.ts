import { Schema, model, Document } from 'mongoose';

export interface IBoard {
	_id?: string;
	title: string;
	numberOfMilestones: number;
	userID: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new Schema<IBoard>(
	{
		title: { type: String, required: true },
		numberOfMilestones: { type: Number, required: true },
		userID: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Board = model<IBoard>('Board', schema);
export { Board };
