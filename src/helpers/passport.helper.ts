import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import { User, IUser } from '@models/user.model';
import { NextFunction, Response, Request } from 'express';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

enum STRATEGY_ENUMS {
	LOCAL = 'local',
	GOOGLE = 'google',
}

export const provideStategy = (strategyType: string) => {
	switch (strategyType) {
		case STRATEGY_ENUMS.LOCAL:
			return new LocalStrategy(
				async (username: string, plainPassword: string, done) => {
					try {
						const foundUser = (
							await User.findOne({
								'local.username': username,
							})
						)?.toJSON() as IUser;

						if (!foundUser) {
							return done(null, false, {
								message: 'User does not exist',
							});
						}

						const storedHashedPassword = foundUser.local.password;
						const passwordCheck: boolean = await bcrypt.compare(
							plainPassword,
							storedHashedPassword
						);

						if (!passwordCheck) {
							return done(null, false, {
								message: 'Incorrect password',
							});
						}

						const { local, ...rest } = foundUser;
						const user = {
							...rest,
							local: {
								username: local.username,
							},
						};
						console.log(user);

						return done(null, user);
					} catch (error) {
						done(error, false);
						console.error(error);
					}
				}
			);
		case STRATEGY_ENUMS.GOOGLE:
			return new GoogleStrategy(
				{
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
					callbackURL: '/auth/google/callback',
				},
				async function (accessToken, refreshToken, profile, cb) {
					try {
						const foundUser = await User.findOne({
							'connectedSocials.google': profile.id,
						});
						if (foundUser) {
							cb(null, foundUser); // return already stored user
						} else {
						}
					} catch (error) {
						cb(error, null);
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
	passport.authenticate(STRATEGY_ENUMS.LOCAL)(req, res, next);
};

export const googleStrategyMiddleware = (
	param: { scope: [string] } | { failureRedirect: string; session: boolean }
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		passport.authenticate(STRATEGY_ENUMS.GOOGLE, param)(req, res, next);
	};
};

/**
 * Global initializer for different passport strategies
 */
export async function onInitPassport() {
	passport.serializeUser((user: IUser, done) => {
		done(null, user._id);
	});
	passport.deserializeUser((id: string, done) => {
		User.findById(id, (err: any, user: IUser) => {
			done(err, user);
		});
	});
	const onInitlocalStrategy = () => {
		passport.use(provideStategy(STRATEGY_ENUMS.LOCAL)); // local strategy added
	};

	const onInitGoogleStrategy = () => {
		passport.use(provideStategy(STRATEGY_ENUMS.GOOGLE));
	};

	// init strategies
	onInitlocalStrategy();
	onInitGoogleStrategy();
}
