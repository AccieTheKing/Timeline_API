import { Request, Response, Router, NextFunction } from 'express';
import { APP_SUBSCRIPTION, IUser, User, USER_ROLES } from '@models/user.model';
import bcrypt from 'bcrypt';
import { localStategyMiddleware } from '@helpers/passport.helper';

const authRouter = Router();

authRouter.post(
	'/login',
	localStategyMiddleware,
	async (req: Request, res: Response) => {
		res.send({
			status: 200,
			message: 'Successfully authenticated',
			data: req.user,
		});
	}
);

authRouter.get('/user', async (req: Request, res: Response) => {
	res.json({ 'Successfully authenticated': req.isAuthenticated() });
});

authRouter.post('/register', async (req: Request, res: Response) => {
	try {
		const { username, password }: IUser = req?.body;

		// Check empty fields
		if (!(username.trim().length > 0) || !(password.trim().length > 0)) {
			res.send('Please check the given values');
		}

		// Check if user already exist
		const foundUser = await User.findOne({ username });
		if (foundUser) {
			res.send('Username already exist');
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser: IUser = new User({
			username,
			password: hashedPassword,
			role: USER_ROLES.USER,
			subscriptionType: APP_SUBSCRIPTION.FREE,
			numberOfBoards: 0,
		});
		await createdUser.save();

		res.send('User succesfuly created');
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

export { authRouter };
