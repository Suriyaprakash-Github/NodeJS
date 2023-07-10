import React, { useRef, useState } from "react";
import axios from "axios";
import classes from "./../styles/Login.module.css";

const Login = () => {
  const [loginSwitch, setLoginSwitch] = useState(false);
  // const [message, setMessage] = useState("");

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

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
          phone: phoneRef.current.value,
          password: passwordRef.current.value,
        })
        .then((result) => console.log(result))
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("http://localhost:4000/user/login", {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          password: passwordRef.current.value,
        })
        .then((result) => {
          console.log(result);
          localStorage.setItem("token", result.data.token);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.error);
        });
    }
    usernameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      <section className={classes.loginContainer}>
        <div className={classes.loginBackground}>
          <section className={classes.l_leftContainer}>
            <div>
              <p> WelCome to Group Chat Application Demo</p>
            </div>
          </section>
          <hr className={classes.hrVertical}></hr>
          <section className={classes.l_rightContainer}>
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
                <label htmlFor="password">Phone Number: </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  ref={phoneRef}
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

              <div className={classes.formControlButton}>
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
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
