import React, { useRef, useState } from "react";
import classes from "../../styles/Login.module.css";

const Login = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loginSwitch, setLoginSwitch] = useState(false);
  const loginSwitchHandler = () => {
    setLoginSwitch((prev) => !prev);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(
      usernameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  return (
    <>
      <div className={classes.loginContainer}>
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
