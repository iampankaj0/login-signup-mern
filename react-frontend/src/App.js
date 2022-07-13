import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
  const [user, setLoginUser] = useState({});

  // GET USER FROM LOCAL STORAGE
  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("myUser")));
  }, []);

  // ADD USER IN LOCAL STORAGE
  const addUserLocal = (user) => {
    localStorage.setItem("myUser", JSON.stringify(user));
    setLoginUser(user);
  };

  const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
  };
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <Route exact path="/">
              {user && user._id ? (
                <Homepage user={user} addUserLocal={addUserLocal} />
              ) : (
                <Login addUserLocal={addUserLocal} />
              )}
            </Route>
            <Route path="/login">
              <Login addUserLocal={addUserLocal} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
