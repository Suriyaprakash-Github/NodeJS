import React, { useState } from "react";
import AddExpenseForm from "./../components/Expense/AddExpenseForm";
import Sidebar from "../components/Layout/Sidebar";
import classes from "../styles/Overview.module.css";
import Chart from "../components/Analytics/Chart";
import AllExpenses from "../components/Expense/AllExpenses";

const Overview = () => {
  const [addExpenseShow, setAddExpenseShow] = useState(false);

  const showAddExpenseFormHandler = () => {
    setAddExpenseShow(true);
  };
  const hideAddExpenseFormHandler = () => {
    setAddExpenseShow(false);
  };

  return (
    <>
      <div className={classes.overview_container}>
        <div className={classes.overvide_sidebar}>
          <Sidebar />
        </div>

        <div className={classes.overview_content}>
          <div className={classes.overview_content_actions}>
            <div>Remaining Funds</div>
            <div>Total Income</div>
            <div>Total Expense</div>

            <button onClick={showAddExpenseFormHandler}>Add Expense</button>
            {addExpenseShow && (
              <AddExpenseForm onClose={hideAddExpenseFormHandler} />
            )}
          </div>

          <div className={classes.overview_content_display}>
            <div className={classes.overview_chart}>
              <Chart />
            </div>
            <div className={classes.overview_table}>
              <AllExpenses />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
