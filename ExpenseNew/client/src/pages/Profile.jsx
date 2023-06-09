import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
document.body.appendChild(script);

const Profile = () => {
  const [leaderboardSorted, setLeaderboardSorted] = useState([]);
  const [allExpense, setAllExpense] = useState([]);

  const token = localStorage.getItem("token");

  const premiumPurchaseHandler = async (e) => {
    let data;
    await axios
      .post("http://localhost:4000/order/premium", {
        headers: { Authorization: token },
      })
      .then((result) => {
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
            localStorage.setItem("token", result.data.token);
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
      const razorpay_payment_id = response.error.metadata.payment_id;
      const razorpay_order_id = response.error.metadata.order_id;

      await axios
        .post("http://localhost:4000/order/updatepremium", {
          headers: { Authorization: token },
          razorpay_payment_id,
          razorpay_order_id,
          status: "failed",
        })
        .then((result) => {})
        .catch((err) => console.log("error posting premium updation", err));
    });
  };
  const decoded = jwt_decode(token);
  console.log(decoded.isPremiumUser);

  const leaderBoardHandler = async () => {
    await axios
      .get("http://localhost:4000/premium/leaderboard")
      .then(
        (result) => setLeaderboardSorted(result.data)
        // console.log(result)
      )
      .catch((err) => console.log(err));
  };
  // console.log(leaderboardSorted);
  const allExpenseHandler = async (e) => {
    const token = localStorage.getItem("token");

    await axios
      .get("http://localhost:4000/expense/allexpenses", {
        headers: { Authorization: token },
      })
      .then((result) => setAllExpense(result.data))
      .catch((err) => console.log(err));
  };

  const downloadHandler = async (e) => {
    await axios
      .get("http://localhost:4000/downloadexpense", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        {decoded.isPremiumUser ? (
          <p>You are a premium User</p>
        ) : (
          <button onClick={premiumPurchaseHandler}>Buy Premium</button>
        )}
      </div>
      {decoded.isPremiumUser && (
        <div>
          <button onClick={leaderBoardHandler}>Leader Board</button>
        </div>
      )}

      {leaderboardSorted.map((leaderboard) => (
        <div key={Math.random()}>
          <span>{leaderboard.user.email}---</span>
          <span>{leaderboard.totalCost}</span>
          {decoded.isPremiumUser && (
            <div>
              <button onClick={allExpenseHandler}>All Expenses</button>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Cost</th>
              </tr>
            </thead>
          </table>

          {allExpense.map((expense) => (
            <tbody key={expense.id}>
              <tr>
                <td>{expense.expense}</td>
                <td>{expense.category}</td>
                <td>{expense.cost}</td>
              </tr>
            </tbody>
          ))}
        </div>
      ))}
      <button onClick={downloadHandler}>Download Expense</button>
    </>
  );
};

export default Profile;
