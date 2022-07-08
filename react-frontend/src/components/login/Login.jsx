import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import "./login.css";

const Login = ({ setLoginUser }) => {
  let history = useHistory();
  const alert = useAlert();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const hadleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    const { email, password } = user;
    if (email && password) {
      axios.post("http://localhost:9002/login", user).then((res) => {
        alert.show(res.data.message);
        setLoginUser(res.data.user);
        history.push("/");
      });
    } else {
      alert.error("Please Fill All Fields");
    }
  };

  return (
    <div className="login">
      {console.log("Login", user)}
      <h1>Login</h1>
      <input
        name="email"
        onChange={hadleInput}
        value={user.name}
        type="text"
        placeholder="Enter your Email"
      />
      <input
        name="password"
        onChange={hadleInput}
        value={user.password}
        type="password"
        placeholder="Enter your Password"
      />
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
