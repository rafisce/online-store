import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
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
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
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
        </>
      )}
    </div>
  );
};

export default ProductScreen;
