import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const ProfileScreen = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>פרטי משתמש</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">שם</label>
              <input
                id="name"
                type="text"
                placeholder="הכנס אימייל"
                value={user.name}
              ></input>
            </div>
            <div>
              <label htmlFor="email">אימייל</label>
              <input
                id="email"
                type="email"
                placeholder="הכנס אימייל"
                value={user.email}
              ></input>
            </div>
            <div>
              <label htmlFor="password">סיסמה</label>
              <input
                id="password"
                type="password"
                placeholder="הכנס סיסמה"
              ></input>
            </div>
            <div>
              <label htmlFor="passwordConfirm">אישור סיסמה</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="אשר סיסמה"
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                עדכן פרטים
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileScreen;
