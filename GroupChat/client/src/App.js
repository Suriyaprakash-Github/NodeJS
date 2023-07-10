import "./App.css";
import Group from "./components/Group/Group";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        {/* Group Chat App
        <Login />
        <Group /> */}
        <Routes>
          <Route path="/login" element={<Login />} exact={true} />
          <Route path="/sendmsg" element={<Group />} exact="true" />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
