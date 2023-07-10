import React, { useRef } from "react";
import classes from "./../styles/Group.module.css";
import axios from "axios";

const Group = () => {
  const messageRef = useRef();

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await axios
      .post("http://localhost:4000/sendmsg", {
        headers: { Authorization: token },
        message: messageRef.current.value,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className={classes.groupContainer}>
        <section className={classes.g_messages}>
          <form onSubmit={sendMessageHandler}>
            <label htmlFor="message">Message</label>
            <input type="text" name="message" id="message" ref={messageRef} />
            <button type="submit">Send</button>
          </form>
        </section>

        <section className={classes.g_onlineUsers}>
          <p>Online Users</p>
        </section>
      </section>
    </>
  );
};

export default Group;
