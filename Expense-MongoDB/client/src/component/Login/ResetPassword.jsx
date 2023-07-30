import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { id } = useParams();
  console.log(id);
  const newpasswordRef = useRef();
  const updatePasswordHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/password/updatepassword", {
      id: id,
      updatepassword: newpasswordRef.current.value,
    });
  };
  return (
    <>
      <div>
        <form action="" onSubmit={updatePasswordHandler}>
          <label htmlFor="newpassword">New Password</label>
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            ref={newpasswordRef}
            required
          />
          <button type="submit">reset password</button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
