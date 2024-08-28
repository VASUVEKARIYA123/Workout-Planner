//index.js

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import entryRoute from "./routes/entries.js";
import routineRoute from "./routes/routines.js";
import mealRoute from "./routes/meals.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { createError } from "./utils/error.js";

const app = express();
dotenv.config();

const PORT = 2000;

const connect = async () => {
    try {
        // console.log(process.env.MONGO);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => { res.send('Hello from Express!') });

app.use(cookieParser())
app.use(express.json());
app.use(helmet());

    // app.use(cors({
    //     origin: "http://localhost:3000",
    //     credentials: true
    // }))

app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);
app.use("/api/routines", routineRoute);
app.use("/api/meals", mealRoute);

app.use((req, res, next) => {
    const error = createError(404,"Could not find this route.");
    throw error;
  });
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
});
app.listen(PORT, () => {
    console.log("Listening on port 2000");
    connect();
});
