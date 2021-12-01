import express from "express";
import mongoose from "mongoose";
import { mongoURI } from "../config/keys.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mongoURI;
mongoose
  .connect(process.env.MONGO_URI || db)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("database error: " + err));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server listening on " + port);
});
