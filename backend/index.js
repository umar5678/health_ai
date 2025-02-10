import dotenv from "dotenv";
dotenv.config();
import express from "express";
import passport from "./passport/index.js";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
const clientOrigin = process.env.CLIENT_URI_1;

const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
app.use(passport.initialize());

// __________

import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/auth", authRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

// app server

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

startServer();

// http://localhost:8000/api/v1/user/auth/register
// http://localhost:8000/api/v1/user/auth/register
// http://localhost:8000/api/v1/user/auth/logout
// http://localhost:8000/api/v1/user/auth/logout
// http://localhost:8000/api/v1/user/auth/refresh-token

// http://localhost:8000/api/v1/user/profile/:userId
// http://localhost:8000/api/v1/user/profile/:userId/create
// http://localhost:8000/api/v1/user/profile/:userId/update
// http://localhost:8000/api/v1/user/profile/:userId/delete
