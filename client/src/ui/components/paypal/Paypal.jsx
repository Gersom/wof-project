import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { API_URL_TRANSACTIONS } from "@common/constants/api";
import axios from "axios";
const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const PaypalView = ({
  dataPost = {
    postId: 0,
    userId: 0,
    caregiverId: 0,
    description: "WOF.COM - Servicio de cuidado de mascota",
    price: 100,
  },
  onPaid = () => null,
}) => {
  const generateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: dataPost.description,
          amount: { value: dataPost.price },
        },
      ],
    });
  };
  const postData = async (data) => {
    try {
      const response = await axios.post(API_URL_TRANSACTIONS, data);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const approveHandler = async (data, actions) => {
    const order = await actions.order.capture();
    // console.log("order:")
    // console.log(order)

    // console.log("data:")
    // console.log(data)

    await postData({
      transactionId: order?.purchase_units[0]?.payments?.captures[0]?.id,
      amount: order?.purchase_units[0]?.amount?.value,
      currencyCode: order?.purchase_units[0]?.amount?.currency_code,

      name: order?.payer?.name.given_name,
      lastName: order?.payer?.name.surname,
      email: order?.payer?.email_address,

      addressLine: order?.purchase_units[0]?.shipping?.address?.address_line_1,
      addressArea1: order?.purchase_units[0]?.shipping?.address?.admin_area_1,
      addressArea2: order?.purchase_units[0]?.shipping?.address?.admin_area_2,
      countryCode: order?.purchase_units[0]?.shipping?.address?.country_code,
      postalCode: order?.purchase_units[0]?.shipping?.address?.postal_code,

      postId: dataPost.postId,
      userId: dataPost.userId,
      caregiverId: dataPost.caregiverId,
    });
    onPaid();
  };

  const cancelHandler = () => {
    // console.log('cancelo el pago :c')
  };
  const errorHandler = (err) => {
    console.log("ocurrio un error papi");
    console.log(err);
  };
  const clickHandler = (data, actions) => {
    // console.log('le dio clic papi')
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": paypalClientId,
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          height: 46,
          label: "paypal",
        }}
        createOrder={generateOrder}
        onApprove={approveHandler}
        onCancel={cancelHandler}
        onError={errorHandler}
        onClick={clickHandler}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalView;
