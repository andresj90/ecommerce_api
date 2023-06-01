/* eslint-disable no-console */
import config from 'config';
import mongoose from 'mongoose';

const host = config.has('database.host') ? config.get('database.host') : null;
const port = config.has('database.port') ? config.get('database.port') : null;
const name = config.has('database.name') ? config.get('database.name') : null;

const DB_CONNECTION = `mongodb://${host}:${port}/${name}`;
console.log({
    env: process.env.NODE_ENV,
    host,
    port,
    name,
    connectionURI: DB_CONNECTION
});

async function startDatabase(): Promise<void> {
    try {
        await mongoose.connect(DB_CONNECTION, {
            connectTimeoutMS: 500,
            autoIndex: true
        });
    } catch (error) {
        console.log('error');
        if (error instanceof Error) {
            console.error(error);
        }
    }
}

mongoose.connection.on('open', () => console.log('Connected to DB'));
mongoose.connection.on('disconnected', () => console.log('Disconnected to DB'));
export { startDatabase };
