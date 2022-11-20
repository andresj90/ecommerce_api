import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: null | MongoMemoryServer = null;
//connect to mock db
async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { maxPoolSize: 10 });
}
//disconnect and close connection
async function disconnect() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
  }
}

//clear the db, remove all data
async function clearDatabase() {
  if (mongoServer) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      const { deletedCount } = await collection.deleteMany({});
      console.log(`Deleted docs from collection ${deletedCount}`);
    }
  }
}

export { connect, disconnect, clearDatabase };
