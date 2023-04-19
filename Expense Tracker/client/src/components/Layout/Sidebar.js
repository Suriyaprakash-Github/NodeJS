import React from "react";
import classes from "./../../styles/Sidebar.module.css";
import ProfilePic from "./../../assets/profile.png";
import editIcon from "../../assets/edit.svg";
import analyticsIcon from "../../assets/analytics.svg";
import calenderIcon from "../../assets/calender.svg";
import helpIcon from "../../assets/help.svg";
import rupeeIcon from "../../assets/rupee.svg";
import settingsIcon from "../../assets/settings.svg";

const Sidebar = () => {
  return (
    <>
      <div className={classes.sidebar_container}>
        <div className={classes.sidebar_imgHeader}>
          <img src={ProfilePic} alt="profile" />
          <h2>Adam's Family</h2>
        </div>
        <hr />
        <div className={classes.sidebar_menu}>
          <div className={classes.sidebar_menuItem}>
            Overview <img src={editIcon} alt="edit" className="icon" />
          </div>
          <div className={classes.sidebar_menuItem}>
            Incomes <img src={rupeeIcon} alt="rupee" className="icon" />
          </div>
          <div className={classes.sidebar_menuItem}>
            Expenses <img src={rupeeIcon} alt="rupee" className="icon" />
          </div>
          <div className={classes.sidebar_menuItem}>
            Analytics{" "}
            <img src={analyticsIcon} alt="analytics" className="icon" />
          </div>
          <div className={classes.sidebar_menuItem}>
            Calender <img src={calenderIcon} alt="calender" className="icon" />
          </div>
          <div className={classes.sidebar_menuItem}>
            Settings <img src={settingsIcon} alt="settings" className="icon" />
          </div>
          <div className={classes.sidebar_menuItem}>
            Help <img src={helpIcon} alt="help" className="icon" />
          </div>
        </div>
        <hr />
        <div className={classes.sidebar_version}>
          <div>Version 0.0.25</div>
          <div className={classes.suriya}>&#169; Suriyaprakash</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
