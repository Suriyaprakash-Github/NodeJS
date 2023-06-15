import React from "react";
import axios from "axios";

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
document.body.appendChild(script);

const Profile = () => {
  const token = localStorage.getItem("token");

  const premiumPurchaseHandler = async (e) => {
    let data;
    await axios
      .post("http://localhost:4000/order/premium", {
        headers: { Authorization: token },
      })
      .then((result) => {
        // console.log(result);
        data = result.data;
      })
      .catch((err) => console.log("error from fetch backend", err));

    const options = {
      key: process.env.REACT_APP_key_id,
      currency: "INR",
      amount: 50000,
      order_id: data.id,
      name: "Somebody robbing you",
      description: "Thank you for nothing. Please give us some money",
      handler: async function (response) {
        const razorpay_payment_id = response.razorpay_payment_id;
        const razorpay_order_id = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;
        await axios
          .post("http://localhost:4000/order/updatepremium", {
            headers: { Authorization: token },
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            status: "successful",
          })
          .then((result) => {
            // console.log(result);
            // data = result.data;
            // console.log("data", data);
          })
          .catch((err) => console.log("error posting premium updation", err));
      },
      prefill: {
        name: "Suriya",
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", async function (response) {
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
      // console.log("failed order id", response.error.metadata.order_id);
      const razorpay_payment_id = response.error.metadata.payment_id;
      const razorpay_order_id = response.error.metadata.order_id;

      await axios
        .post("http://localhost:4000/order/updatepremium", {
          headers: { Authorization: token },
          razorpay_payment_id,
          razorpay_order_id,
          // razorpay_signature,
          status: "failed",
        })
        .then((result) => {
          // console.log(result);
          // data = result.data;
          // console.log("data", data);
        })
        .catch((err) => console.log("error posting premium updation", err));
    });
  };

  return (
    <>
      <div>
        <button onClick={premiumPurchaseHandler}>Buy Premium</button>
      </div>
    </>
  );
};

export default Profile;
