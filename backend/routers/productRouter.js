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
productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.brand = req.body.brand;
      product.image = req.body.image;
      product.countInStock = req.body.countInStock;
      product.category = req.body.category;
      product.description = req.body.description;

      const updatedProduct = await product.save();
      res.send({ message: "מוצר עודכן", product: updatedProduct });
    } else {
      res.status(404).send({ message: "מוצר לא נמצא" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      const deletedProduct = await product.delete();
      res.send({ message: "מוצר נמחק", product: deletedProduct });
    } else {
      res.status(404).send({ message: "מוצר לא נמצא" });
    }
  })
);

productRouter.put(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});

    const items = req.body.orderItems;
    if (items.length > 0) {
      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < products.length; j++) {
          if (items[i].product == products[j]._id) {
            if (items[i].qty <= products[j].countInStock) {
              products[j].countInStock -= items[i].qty;
              res.send(products[j]);
              await products[j].save();
            } else {
              const item = items[i];
              res.send({ message: `כמות גדולה מדי : ${item.qty}`, item });
            }
          }
        }
      }
      res.send({ message: "רשימת מוצרים עודכנה" });
    }
  })
);

export default productRouter;
