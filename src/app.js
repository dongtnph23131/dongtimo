import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
import categoryRouter from "./routers/category"
import productRouter from "./routers/product"
import authRouter from "./routers/auth"

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",categoryRouter)
app.use("/api",productRouter)
app.use("/api",authRouter)

mongoose.connect(process.env.MONGO_URL);

export const viteNodeApp = app;
