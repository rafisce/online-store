import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = (props) => {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      props.history.push("/productlist");
    }
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
  }, [dispatch, product, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        countInStock,
        description,
        image,
        category,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const [successUpload, setSuccessUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
      setSuccessUpload(true);
      setErrorUpload("");
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
      setSuccessUpload(false);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> ערוך מוצר {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {successUpdate && (
          <MessageBox variant="success">מוצר עודכן בהצלחה</MessageBox>
        )}
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
                dir="LTR"
                className="img"
                id="image"
                type="text"
                placeholder="הכנס תמונה"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">קובץ תמונה</label>
              <input
                type="file"
                id="imageFile"
                label="בחר תמונה"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox />}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
              {successUpload && (
                <MessageBox variant="success">תמונה הועלתה בהצלחה</MessageBox>
              )}
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
