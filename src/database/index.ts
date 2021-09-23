import mongoose from 'mongoose';

const uri = process.env.ATLAS_URI;

const connect = () => {
	mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	});
};
const server = mongoose.connection;

async function connectToDB() {
	server.once('connected', () => {
		console.log('connected to mongoDB');
	});
}

connect();
export { connectToDB };
