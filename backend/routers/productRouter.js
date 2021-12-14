import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.post(
  "/init",
  expressAsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const products = await Product.insertMany(data.products);

    res.send({ products });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "מוצר לא קיים" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: " שם סרק " + Date.now(),
      image: "/images/p.jpg",
      price: 0,
      category: "קטגוריית סרק",
      brand: "חברת סרק",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "תיאור סרק",
    });
    const createdProduct = await product.save();

    res.send({ message: "מוצר חדש נוצר", product: createdProduct });
  })
);

export default productRouter;
