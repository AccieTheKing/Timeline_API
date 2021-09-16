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
	_id: string;
	subscriptionType: APP_SUBSCRIPTION;
	numberOfBoards: number;
	role: USER_ROLES;
	displayName: string;
	local: {
		username?: string;
		password?: string;
	};
	connectedSocails: {
		googleId: string;
		facebookId: string;
		twitterId: string;
	};
}

const schema = new Schema<IUser>({
	subscriptionType: { type: String, required: true },
	role: { type: String, required: true },
	numberOfBoards: { type: Number, required: true },
	displayName: { type: String },
	local: {
		type: Object,
		required: false,
		username: { type: String },
		password: { type: String },
	},
	connectedSocials: {
		type: Object,
		required: false,
		googleId: { type: String },
		facebookId: { type: String },
		twitterId: { type: String },
	},
});

const User = model<IUser>('User', schema);
export { User };
