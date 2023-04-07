import express from "express";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
const API_DB = process.env.API_DB;
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", authRouter);


mongoose.connect(API_DB);


export const viteNodeApp = app;

