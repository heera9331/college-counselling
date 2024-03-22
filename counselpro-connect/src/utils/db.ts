import mongoose from "mongoose";

const connection = {};
const MONGO = process.env.MONGO_LOCAL;

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    console.log(MONGO);
    const db = await mongoose.connect(MONGO);
    // const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    console.log('db is connected');
  } catch (error) {
    console.log(error);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect()
}

// connectDB("mongodb://127.0.0.1:27017/COLLEGE_COUNSELLING");

export { connectDB, disconnectDB };
