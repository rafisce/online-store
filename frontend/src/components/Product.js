import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <div className="card">
        <Link to={`/product/${product._id}`} className="noUL">
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`} className="noUL">
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
