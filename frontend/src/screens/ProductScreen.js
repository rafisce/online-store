import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import data from "../data";

const ProductScreen = (props) => {
  const product = data.products.find(
    (x) => x._id.toString() === props.match.params.id
  );

  if (!product) {
    return <div>מוצר לא קיים!</div>;
  }
  return (
    <div>
      <Link to="/">בחזרה לתוצאות</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.img} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li>מחיר: ₪{product.price}</li>
            <li>
              <p>תיאור: {product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>מחיר</div>
                  <div className="price">₪{product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>סטטוס</div>
                  <div className="status">
                    {product.countInStock > 0 ? (
                      <span className="success">במלאי</span>
                    ) : (
                      <span className="error">לא במלאי</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">הוסף לעגלה</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
