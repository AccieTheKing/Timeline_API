import { Schema, model, Document } from 'mongoose';

export enum APP_SUBSCRIPTION {
	FREE = 'FREE',
	PREMIUM = 'PREMIUM',
}

export enum USER_ROLES {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export interface IUser {
	id?: string;
	username: string;
	password?: string;
	subscriptionType: APP_SUBSCRIPTION;
	role: USER_ROLES;
}

const schema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: false },
	subscriptionType: { type: String, required: true },
	role: { type: String, required: true },
	numberOfBoards: { type: Number, required: true },
});

const User = model<IUser>('User', schema);
export { User };
