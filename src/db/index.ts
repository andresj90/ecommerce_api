import mongoose from 'mongoose';
import config from 'config';

const host = config.has('database.host') ? config.get('database.host') : null;
const port = config.has('database.port') ? config.get('database.port') : null;
const name = config.has('database.name') ? config.get('database.name') : null;

// eslint-disable-next-line no-console
console.log({ env: process.env.NODE_ENV, host, port, name });

const DB_CONNECTION = `mongodb://${host}:${port}/${name}`;

const startDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_CONNECTION, {
      connectTimeoutMS: 500,
      autoIndex: true
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error');
    if (error instanceof Error) {
      console.error(error);
    }
  }
};
// eslint-disable-next-line no-console
mongoose.connection.on('open', () => console.log('Connected to DB'));
// eslint-disable-next-line no-console
mongoose.connection.on('disconnected', () => console.log('Disconnected to DB'));
export { startDatabase };
