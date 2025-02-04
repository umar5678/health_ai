import mongoose from "mongoose";

import { DB_NAME } from "../config/dbName.js";

let dbInstance = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    dbInstance = connectionInstance;

    console.log(
      `\n☘️ MONGODB CONNECTED! db host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
