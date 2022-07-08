import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
  const [user, setLoginUser] = useState({});

  const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
  };
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <Switch>
            <Route path="/">
              {user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )}
            </Route>
            <Route exact path="/login">
              <Login setLoginUser={setLoginUser} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
