import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../Utils/graphQLService";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Register({}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "patient",
    dateOfBirth: "",
  });
  const { login, isLoggedIn, userType } = useAuth();
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

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log("Signup successful", data);
      console.log("token", data.signup.token);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ variables: formData });
  };

  if (data) {
    console.log("Signup successful", data);
    console.log("token", data.signup.token);
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

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
              type="password" // Use "password" type for hidden text
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="userType">
            <Form.Label>User Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select user type
              </option>
              <option value="patient">Patient</option>
              <option value="nurse">Nurse</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          {error && <div className="error-message">Error: {error.message}</div>}
        </Form>
      </div>
    </div>
  );
}

export default Register;
