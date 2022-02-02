import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { connectToDB } from '@database';
import { authRouter } from '@routes/authentication.route';
import { boardRouter } from '@routes/boards.route';
import { onInitPassport } from '@helpers/passport.helper';
import { milestoneRouter } from '@routes/milestones.route';

const port: number = parseInt(process.env.PORT) || 5000;
const app = express();

const corsOptions = {
	credentials: true,
	origin: ['http://localhost:3000', 'http://localhost:8080'],
	// origin: ['*'],
};

connectToDB(); // Establish database connection

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(
	session({
		secret: process.env.EXPRESS_SESSION,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

onInitPassport(); // initialize all passport stategies

// App routes
app.use('/auth', authRouter);
app.use('/boards', boardRouter);
app.use('/milestone', milestoneRouter);
// app.use('/users', usersRouter);

app.listen(port, () => console.log(`App listens to port ${port}`));
