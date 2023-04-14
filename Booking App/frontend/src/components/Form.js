import React, { useState, useRef, useEffect } from "react";
import classes from "./Form.module.css";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({});
  const enteredName = useRef();
  const enteredEmail = useRef();
  const enteredPhone = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/users/createUser", {
        name: enteredName.current.value,
        phone: enteredPhone.current.value,
        email: enteredEmail.current.value,
      })
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <form
          action="http://localhost:4000/users/createUser"
          method="post"
          onSubmit={formSubmitHandler}
        >
          <div className={classes.formControl}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" ref={enteredName} />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="email">E-Mail:</label>
            <input type="email" name="email" id="email" ref={enteredEmail} />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="phone">Phone:</label>
            <input type="number" name="phone" id="phone" ref={enteredPhone} />
          </div>
          <button type="submit">Book an Appointment</button>
        </form>
      </div>
    </>
  );
};

export default Form;
