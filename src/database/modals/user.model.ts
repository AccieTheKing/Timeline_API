import { Schema, model, Document } from 'mongoose';

export enum APP_SUBSCRIPTION {
	FREE = 'FREE',
	PREMIUM = 'PREMIUM',
}

export interface IUser extends Document {
	_id: string;
	username: string;
	password?: string;
	subscriptionType: APP_SUBSCRIPTION;
	access_token?: string;
}

const schema = new Schema<IUser>({
	username: { type: String, required: true },
	password: { type: String, required: false },
	subscriptionType: { type: String, required: true },
	numberOfBoards: { type: Number, required: true },
});

const User = model<IUser>('User', schema);
export { User };
