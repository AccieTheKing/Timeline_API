import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectToDB } from './src/database';

const port: number = parseInt(process.env.PORT) || 5000;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// const boardsRouter = require('./src/routes/boards');
// const usersRouter = require('./src/routes/users');
// const storiesRouter = require('./src/routes/stories');

// app.use('/boards', boardsRouter);
// app.use('/stories', storiesRouter);
// app.use('/users', usersRouter);
connectToDB(); // try to connect to the database

app.listen(port, () => console.log(`App listens to port ${port}`));
