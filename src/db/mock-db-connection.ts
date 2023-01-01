/* eslint-disable no-console */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: null | MongoMemoryServer = null;
//connect to mock db
async function connect(): Promise<void> {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  console.log({ uri });
  await mongoose.connect(uri, { maxPoolSize: 1 });
}
//disconnect and close connection
async function disconnect(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
}

//clear the db, remove all data
async function clearDatabase(): Promise<void> {
  if (mongoServer) {
    const collections = await mongoose.connection.db?.collections();
    if (collections) {
      for (const collection of collections) {
        const { deletedCount } = await collection.deleteMany({});
        console.log(`Deleted docs from collection ${deletedCount}`);
      }
    }
  }
}

export { connect, disconnect, clearDatabase };
