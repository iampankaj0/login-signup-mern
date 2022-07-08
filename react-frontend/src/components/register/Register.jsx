import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import "./register.css";

const Register = () => {
  let history = useHistory();
  const alert = useAlert();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPass: "",
  });

  const hadleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPass } = user;
    if (name && email && password && password === reEnterPass) {
      axios.post("http://localhost:9002/register", user).then((res) => {
        alert.show(res.data.message);
        history.push("/login");
      });
    } else {
      alert.error("Invalid inputs");
    }
  };

  return (
    <div className="register">
      {console.log(user)}
      <h1>Register</h1>
      <input
        name="name"
        onChange={hadleInput}
        value={user.name}
        type="text"
        placeholder="Your Name"
      />
      <input
        name="email"
        onChange={hadleInput}
        value={user.email}
        type="text"
        placeholder="Your Email"
      />
      <input
        name="password"
        onChange={hadleInput}
        value={user.password}
        type="password"
        placeholder="Your Password"
      />
      <input
        name="reEnterPass"
        onChange={hadleInput}
        value={user.reEnterPass}
        type="password"
        placeholder="Re-enter Password"
      />
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
