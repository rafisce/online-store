import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate]);

  const deleteHandler = () => {};
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="row">
        <h1>רשימת מוצרים</h1>
        <button type="button" className="primary" onClick={createHandler}>
          צור מוצר
        </button>
      </div>
      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {successCreate && (
        <MessageBox variant="success">מוצר חדש נוצר</MessageBox>
      )}

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>מק"ט</th>
              <th>שם</th>
              <th>מחיר</th>
              <th>קטגוריה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    ערוך
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;
