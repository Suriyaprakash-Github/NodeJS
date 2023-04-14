import React from "react";
import classes from "./Form.module.css";

const Form = () => {
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <form action="" method="post" onSubmit={formSubmitHandler}>
          <div className={classes.formControl}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="email">E-Mail:</label>
            <input type="email" name="email" id="email" />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="phone">Name:</label>
            <input type="number" name="phone" id="phone" />
          </div>
          <button type="submit">Book an Appointment</button>
        </form>
      </div>
    </>
  );
};

export default Form;
