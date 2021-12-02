import React, { useState } from "react";
import { Link } from "react-router-dom";

const SigninScreen = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>התחברות</h1>
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
              id="passwpord"
              placeholder="הכנס סיסמה"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary block" type="submit">
              התחבר
            </button>
          </div>
          <div>
            <label />
            <div>
              משתמש חדש? <Link to="/register">צור חשבון חדש</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
