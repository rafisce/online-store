import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error, loading } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (passwordConfirm !== password) {
      alert("!סיסמאות לא תואמות");
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>הרשמה</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label html="name">שם משתמש</label>
          <input
            type="text"
            id="name"
            placeholder="הכנס שם משתמש"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label html="email">כתובת אימייל</label>
          <input
            type="email"
            id="email"
            placeholder="הכנס אימייל"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label html="password">סיסמה</label>
          <input
            type="password"
            id="password"
            placeholder="הכנס סיסמה"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label html="passwordConfirm">אשר סיסמה</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="אשר סיסמה"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary block" type="submit">
            הירשם
          </button>
        </div>
        <div>
          <label />
          <div>
            כבר יש לך חשבון? <Link to="/signin">התחבר</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
