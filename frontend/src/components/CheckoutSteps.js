import React from "react";

const CheckoutSteps = (props) => {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>התחבר</div>
      <div className={props.step2 ? "active" : ""}>משלוח</div>
      <div className={props.step3 ? "active" : ""}>תשלום</div>
      <div className={props.step4 ? "active" : ""}>בצע הזמנה</div>
    </div>
  );
};

export default CheckoutSteps;
