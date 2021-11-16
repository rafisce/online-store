import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <div className="card">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.img} alt={product.name} />
        </Link>
        <div class="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <div className="price">{product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
