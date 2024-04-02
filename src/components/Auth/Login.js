import React, { useState, useEffect } from "react";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggedIn, userType, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      switch (userType) {
        case "nurse":
          navigate("/nurse");
          break;
        case "patient":
          navigate("/patient");
          break;
        default:
          navigate("/profile");
      }
    }
  }, [isLoggedIn, userType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
          {error && <p>Error: {error.message}</p>}
        </Form>
      </div>
    </div>
  );
}

export default Login;
