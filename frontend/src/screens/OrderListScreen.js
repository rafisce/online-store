import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import moment from "moment";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

const OrderListScreen = (props) => {
  const navigate = useNavigate();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());

    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm("אתה בטוח שאתה רוצה למחוק את הזמנה זו?")) {
      dispatch(deleteOrder(order));
    }
  };
  return (
    <div>
      <h1>הזמנות</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>מס</th>
              <th>משתמש</th>
              <th>תאריך</th>
              <th>סה"כ</th>
              <th>שולם</th>
              <th>נשלח</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>
                  {moment(new Date(order.createdAt), "LLLL", "he").format(
                    "HH:mm DD/MM/YYYY"
                  )}
                </td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid
                    ? moment(new Date(order.paidAt), "LLLL", "he").format(
                        "HH:mm DD/MM/YYYY"
                      )
                    : "לא"}
                </td>
                <td>
                  {order.isDelivered
                    ? moment(new Date(order.paidAt), "LLLL", "he").format(
                        "HH:mm DD/MM/YYYY"
                      )
                    : "לא"}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => navigate(`/order/${order._id}`)}
                  >
                    פרטים
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
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

export default OrderListScreen;
