import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { payOrder } from "../actions/orderActions";

const PayPalComp = ({ amount, currency, cid, style, showSpinner, o }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": cid,
          components: "buttons",
          currency: currency,
        }}
      >
        <PayPalButtons
          disabled={false}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              dispatch(payOrder(o, details));
              // Your code here after capture the order
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalComp;
