import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import data from "../data";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  console.log(products);
  return (
    <div>
      <div className="row center">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>לא נמצאו מוצרים</MessageBox>}
            <div className="row center">
              {data.products.map(
                (product) =>
                  product.price > 0 && (
                    <Product key={product._id} product={product}></Product>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
