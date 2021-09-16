import { Schema, model, Document } from 'mongoose';

export enum APP_SUBSCRIPTION {
	FREE = 'FREE',
	PREMIUM = 'PREMIUM',
}

export enum USER_ROLES {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

interface ISocialsData {
	id: string;
	email: string;
	name: string;
	token: string;
}

export interface IUser {
	_id: string;
	local: {
		username?: string;
		password?: string;
	};
	subscriptionType: APP_SUBSCRIPTION;
	numberOfBoards: number;
	role: USER_ROLES;
	google?: ISocialsData;
	facebook?: ISocialsData;
	twitter?: ISocialsData;
}

const schema = new Schema<IUser>({
	subscriptionType: { type: String, required: true },
	role: { type: String, required: true },
	numberOfBoards: { type: Number, required: true },
	local: {
		type: Object,
		required: false,
		username: { type: String },
		password: { type: String },
	},
	google: {
		type: Object,
		require: false,
		id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	facebook: {
		type: Object,
		require: false,
		id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	twitter: {
		type: Object,
		require: false,
		id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
});

const User = model<IUser>('User', schema);
export { User };
