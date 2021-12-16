import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const PlaceOrderScreen = (props) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  //navigate("/payment");

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, navigate, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>משלוח</h2>
                <p>
                  <strong>שם: </strong>
                  {cart.shippingAddress.fullName}
                  <br />
                  <strong>כתובת: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>פריטי הזמנה</h2>
                <ul>
                  {cart.cartItems.map((item) => (
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
                  <div>₪{cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>משלוח</div>
                  <div>₪{cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>עמלה</div>
                  <div>₪{cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>סה"כ לתשלום</strong>
                  </div>
                  <div>
                    <strong>₪{cart.totalPrice}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                >
                  בצע הזמנה
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
