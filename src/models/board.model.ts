import { Schema, model, Document } from 'mongoose';

export interface IBoard extends Document {
	_id?: string;
	title: string;
	numberOfMilestones: number;
	userID: string;
	createdAt?: Date;
}

const schema = new Schema<IBoard>(
	{
		title: { type: String, required: true },
		numberOfMilestones: { type: Number, required: true },
		userID: { type: String, required: true },
		createdAt: { type: Date, required: false },
		updatedAt: { type: Date, required: false },
	},
	{
		timestamps: true,
	}
);

const Board = model<IBoard>('Board', schema);
export { Board };
