import React from "react";
import "./homepage.css";

const Homepage = ({ addUserLocal, user }) => {
  return (
    <div className="homepage">
      <h1>Hello {user.name} </h1>
      <div className="button" onClick={(() => addUserLocal([]))}>
        Logout
      </div>
    </div>
  );
};

export default Homepage;
