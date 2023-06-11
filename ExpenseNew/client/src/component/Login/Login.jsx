import React, { useRef, useState } from "react";
import classes from "../../styles/Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const [loginSwitch, setLoginSwitch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loginSwitchHandler = () => {
    setLoginSwitch((prev) => !prev);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!loginSwitch) {
      await axios
        .post("http://localhost:4000/user/signup", {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((result) => setSuccessMessage(result.data.message))
        .catch((err) => {
          setErrorMessage(err.response.data);
          console.log(err);
        });
    } else {
      await axios
        .post("http://localhost:4000/user/login", {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((result) => {
          setSuccessMessage(result.data.message);
          navigate("/expense");
        })
        .catch((err) => {
          setErrorMessage(err.response.data.error);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className={classes.loginContainer}>
        {loginSwitch ? <h2>Login</h2> : <h2>Signup</h2>}

        <form
          action=""
          onSubmit={formSubmitHandler}
          className={classes.loginForm}
        >
          <div className={classes.formControl}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              ref={usernameRef}
              required
            />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              required
            />
          </div>

          <div className={classes.formControl}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              required
            />
          </div>

          <div className={classes.formControl}>
            {loginSwitch ? (
              <button type="submit">Login</button>
            ) : (
              <button type="submit">Signup</button>
            )}
          </div>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        {loginSwitch ? (
          <p>
            Don't have an account?
            <button onClick={loginSwitchHandler}>Signup</button>
          </p>
        ) : (
          <p>
            Already have an account?
            <button onClick={loginSwitchHandler}>Login</button>
          </p>
        )}
      </div>
    </>
  );
};

export default Login;
