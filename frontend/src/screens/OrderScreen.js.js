import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import moment from "moment";

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver } = orderDeliver;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, successDeliver, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
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
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    נשלח ב -{" "}
                    {moment(new Date(order.deliveredAt), "LLLL", "he").format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">לא נשלח</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>תשלום</h2>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    שולם ב -{" "}
                    {moment(new Date(order.paidAt), "LLLL", "he").format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">לא שולם</MessageBox>
                )}
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
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox />}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    שלח הזמנה
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
