import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User, IUser } from '@models/user.model';
import { NextFunction, Response, Request } from 'express';

const LocalStrategy = passportLocal.Strategy;
export const provideStategy = (strategyType: string) => {
	switch (strategyType) {
		case 'local':
			return new LocalStrategy(
				async (username: string, plainPassword: string, done) => {
					try {
						const foundUser = (
							await User.findOne({
								username,
							})
						)?.toJSON() as IUser;

						if (!foundUser) {
							return done(null, false, {
								message: 'User does not exist',
							});
						}

						const passwordCheck: boolean = await bcrypt.compare(
							plainPassword,
							foundUser.password
						);

						if (!passwordCheck) {
							return done(null, false, {
								message: 'Incorrect password',
							});
						}

						const { password, ...user } = foundUser;

						return done(null, user);
					} catch (error) {
						done(error, false);
						console.error(error);
					}
				}
			);
	}
};

export const localStategyMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate('local')(req, res, next);
};

/**
 * Global initializer for different passport strategies
 */
export async function onInitPassport() {
	passport.use(provideStategy('local')); // local strategy added
	passport.serializeUser((user: IUser, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id: string, done) => {
		User.findById(id, (err: any, user: IUser) => {
			done(err, user);
		});
	});
}
