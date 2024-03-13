import React from "react";
import "./Login.css";

function Login({ closeLogin }) {
  return (
    <div className="login-container">
      {/* Your login form/content */}
      <div className="login-form">
        <h1>Login</h1>
        {/* Your form elements */}
        <button onClick={closeLogin}>Cancel</button>
      </div>
    </div>
  );
}

export default Login;
