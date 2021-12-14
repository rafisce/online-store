import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
