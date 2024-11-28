import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDb() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the database: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
