import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddressScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, zipCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>כתובת משלוח</h1>
        </div>
        <div>
          <label htmlFor="fullName">שם מלא</label>
          <input
            type="text"
            id="fullName"
            placeholder="הכנס שם מלא"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">כתובת</label>
          <input
            type="text"
            id="address"
            placeholder="הכנס כתובת"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">עיר</label>
          <input
            type="text"
            id="city"
            placeholder="הכנס עיר"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="zipCode">מיקוד</label>
          <input
            type="text"
            id="zipCode"
            placeholder="הכנס מיקוד"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">ארץ</label>
          <input
            type="text"
            id="country"
            placeholder="הכנס ארץ"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            המשך
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddressScreen;
