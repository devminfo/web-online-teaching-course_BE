import { MongoClient } from 'mongodb';

const databaseUrl = process.env.MONGODB_URL as string;
const databaseName = process.env.DATABASE_NAME as string;
const Client = new MongoClient(databaseUrl);

export const getConnectionDb = () => {
  return Client.db(databaseName);
};
