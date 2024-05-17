import mongoose, { Connection } from "mongoose";

interface DBConnection {
  isConnected?: number;
}

const connection: DBConnection = {}; // Define the shape of connection object
const MONGO: string = process.env.MONGO || "";

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    console.log(MONGO);
    const db = await mongoose.connect(MONGO);
    connection.isConnected = db.connections[0].readyState;
    console.log("db is connected");
  } catch (error) {
    console.log(error);

    throw new Error("database error");
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

export { connectDB, disconnectDB };
