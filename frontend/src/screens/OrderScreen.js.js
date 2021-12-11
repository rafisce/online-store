import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>הזמנה {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>משלוח</h2>
                <p>
                  <strong>שם: </strong>
                  {order.shippingAddress.fullName}
                  <br />
                  <strong>כתובת: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.zipCode},{" "}
                  {order.shippingAddress.country}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>פריטי הזמנה</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link
                            className="noUL"
                            to={`/prodocts/${item.product}`}
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div dir="LTR">
                          ₪{item.qty * item.price} = ₪{item.price} x {item.qty}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1_">
          <div className="card card-body">
            <ul>
              <li>
                <h2>סיכום הזמנה</h2>
              </li>
              <li>
                <div className="row">
                  <div>פריטים</div>
                  <div>₪{order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>משלוח</div>
                  <div>₪{order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>עמלה</div>
                  <div>₪{order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>סה"כ לתשלום</strong>
                  </div>
                  <div>
                    <strong>₪{order.totalPrice}</strong>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
