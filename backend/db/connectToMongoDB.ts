import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_DB_URI;
const connectToMongoDB = async () => {
  try {
    if (!uri) {
      throw new Error('MONGO_DB_URI environment variable is not defined');
    }
    await mongoose.connect(uri);
    console.log('connected to MongoDB');
  } catch (error: any) {
    console.log('Error connecting to MongoDB', error.message);
  }
};

export default connectToMongoDB;
