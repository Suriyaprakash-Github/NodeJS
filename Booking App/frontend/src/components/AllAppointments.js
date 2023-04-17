import React, { useState, useEffect } from "react";
import axios from "axios";

const AllAppointments = () => {
  const [flag, setFlag] = useState(false);
  const [all, setAll] = useState([]);

  useEffect(() => {
    setFlag(true);
    axios
      .get("http://localhost:4000/getUsers")
      .then((res) => setAll(res.data))
      .catch((err) => console.log(err));
  }, [flag]);

  //   const allAppointmets = async () => {
  //     setFlag(true);
  //     await axios
  //       .get("http://localhost:4000/getUsers")
  //       .then((res) => setAll(res.data))
  //       .catch((err) => console.log(err));
  //     console.log(all);
  //   };

  const deleteUser = async (del) => {
    let id;
    setFlag(true);
    await axios
      .get("http://localhost:4000/deleteUser", { params: { id: del } })
      //   .then((res) => console.log(res))
      .then(axios.get("http://localhost:4000/getUsers"))
      .then(setFlag(true))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        {/* <button onClick={allAppointmets}>All Appointments</button> */}
        {flag ? (
          all.map((item) => {
            return (
              <>
                <div key={item.id}>
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                  <span>{item.phone}</span>
                  <button onClick={deleteUser.bind(null, item.id)}>
                    Delete
                  </button>
                </div>
              </>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default AllAppointments;
