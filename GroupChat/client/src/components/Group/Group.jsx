import React from "react";
import classes from "./../styles/Group.module.css";

const Group = () => {
  return (
    <>
      <section className={classes.groupContainer}>
        <section className={classes.g_messages}>
          <p>Message Section</p>
        </section>

        <section className={classes.g_onlineUsers}>
          <p>Online Users</p>
        </section>
      </section>
    </>
  );
};

export default Group;
