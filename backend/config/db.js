import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'HealthBD';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client;
let dbInstance = null;

export async function connectToDatabase() {
  if (dbInstance) {
    return { client, db: dbInstance };
  }

  try {
    client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    console.log(`Connected successfully to MongoDB Atlas database: ${dbName}`);
    dbInstance = client.db(dbName);
    return { client, db: dbInstance };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export function getDb() {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return dbInstance;
}
