import React, { useState, useEffect } from "react";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { validateLogin } from "../Validation";
import Alert from "@mui/material/Alert";

function getErrorMessageOrElse(error, orElse) {
  if (error && error.message) {
    return error.message;
  }

  return orElse;
}

function Login() {
  const { login, isLoggedIn, userType, loading, error } = useAuth();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
          navigate("/home");
      }
    }
  }, [isLoggedIn, userType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await login(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back!</h1>
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
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
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
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </Form.Group>
          <div className="button-container">
            <Button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
            {error && (
              <Alert severity="error" className="mt-2">
                {getErrorMessageOrElse(error, "Couldn't login user")}
              </Alert>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
