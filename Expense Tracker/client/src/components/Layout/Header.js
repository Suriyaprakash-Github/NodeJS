import React from "react";
import classes from "../../styles/Header.module.css";
import bellIcon from "./../../assets/bell.svg";
import userIcon from "./../../assets/user.svg";
import searchIcon from "../../assets/search.svg";

const Header = () => {
  return (
    <>
      <div className={classes.header_container}>
        <h1>Expense Tracker</h1>
        <div className={classes.header_navItems}>
          <div className={classes.searchBar}>
            <div>
              <img className="icon" src={searchIcon} alt="search" />
            </div>
            <input type="text" placeholder="Search Expenses" />
          </div>
          <button className={classes.header_buttons}>
            <img className="icon" src={bellIcon} alt="notifications" />
          </button>
          <button className={classes.header_buttons}>
            <img className="icon" src={userIcon} alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
