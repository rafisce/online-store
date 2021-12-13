import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userProfileUpdate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, userInfo._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("!סיסמאות לא תואמות");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
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
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">פרופיל עודכן בהצלחה</MessageBox>
            )}
            <div>
              <label htmlFor="name">שם</label>
              <input
                id="name"
                type="text"
                placeholder="הכנס אימייל"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">אימייל</label>
              <input
                id="email"
                type="email"
                placeholder="הכנס אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">סיסמה</label>
              <input
                id="password"
                type="password"
                placeholder="הכנס סיסמה"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="passwordConfirm">אישור סיסמה</label>
              <input
                id="passwordConfirm"
                type="password"
                placeholder="אשר סיסמה"
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
