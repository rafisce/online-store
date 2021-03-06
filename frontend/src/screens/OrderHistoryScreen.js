import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listOrderMine } from "../actions/orderActions";

const OrderHistoryScreen = (props) => {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1>היסטוריית הזמנות</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>מס</th>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistoryScreen;
