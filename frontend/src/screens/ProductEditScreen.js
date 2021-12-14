import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProductEditScreen = () => {
  const params = useParams();
  const { id: productId } = params;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!product || product._id !== productId) {
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
      setCategory(product.category);
    }
  }, [dispatch, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> ערוך מוצר {productId}</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">שם</label>
              <input
                id="name"
                type="text"
                placeholder="הכנס שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">מחיר</label>
              <input
                id="price"
                type="text"
                placeholder="הכנס מחיר"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">תמונה</label>
              <input
                id="image"
                type="text"
                placeholder="הכנס תמונה"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">כמות</label>
              <input
                id="countInStock"
                type="text"
                placeholder="הכנס כמות"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">קטגוריה</label>
              <input
                id="category"
                type="text"
                placeholder="הכנס קטגוריה"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">חברה</label>
              <input
                id="brand"
                type="text"
                placeholder="הכנס חברה"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">תיאור</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="הכנס תיאור"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                עדכן
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProductEditScreen;
