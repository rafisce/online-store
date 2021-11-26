import express from "express";
import mongoose from "mongoose";
import { mongoURI } from "../config/keys.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const db = mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("database error: " + err));
const port = process.env.port || 5000;

app.listen(port, () => {
  console.log("server listening on " + port);
});
