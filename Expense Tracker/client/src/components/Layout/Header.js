import React from "react";
import classes from "../../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <div className={classes.header_container}>
        <h1>Expense Tracker</h1>
        <div className={classes.header_navItems}>
          <button>Notifications</button>
          <button>Profile</button>
        </div>
      </div>
    </>
  );
};

export default Header;
