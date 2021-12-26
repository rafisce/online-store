import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div dir="rtl" className="grid-container">
        <header className="row">
          <div>
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin" className="noUL">
                  מנהל <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard" className="noUL">
                      דשבורד
                    </Link>
                  </li>
                  <li>
                    <Link to="/productlist" className="noUL">
                      מוצרים
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderlist" className="noUL">
                      הזמנות
                    </Link>
                  </li>
                  <li>
                    <Link to="/userlist" className="noUL">
                      משתמשים
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#" className="noUL">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile" className="noUL">
                      פרופיל משתמש
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderhistory" className="noUL">
                      ההזמנות שלי
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#signout"
                      className="noUL"
                      onClick={signoutHandler}
                    >
                      התנתק
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="noUL">
                התחבר
              </Link>
            )}

            <Link to="/cart" className="noUL">
              עגלה
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
          </div>
          <div>
            <Link to="/" className="brand noUL">
              ONLINE-STORE
            </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} exact />
            <Route
              path="/product/:id/edit"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
              exact
            />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />
            <Route path="/" element={<HomeScreen />} exact />
          </Routes>
        </main>
        <footer className="row center">כל הזכויות שמורות</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
