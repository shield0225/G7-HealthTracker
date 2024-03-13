import React from "react";
import "./Login.css";

function Register({ closeRegister }) {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register</h1>
        <button onClick={closeRegister}>Cancel</button>
      </div>
    </div>
  );
}

export default Register;
