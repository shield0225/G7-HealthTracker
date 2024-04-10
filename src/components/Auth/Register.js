import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../Utils/graphQLService";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

function getErrorMessageOrElse(error, orElse) {
  if (error && error.message) {
    return error.message;
  }

  return orElse;
}

function Register({}) {
  // Initial state for resetting the form
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "patient", // Assuming you always want this as the default selection
    dateOfBirth: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { login, isLoggedIn, userType, userId, firstName } = useAuth();
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
  }, [isLoggedIn, userType, userId, firstName, navigate]);

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log("Signup successful", data);
      console.log("token", data.signup.token);
      // Reset the form data to the initial state
      setFormData(initialState);
    }
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
    // Note: The formData reset is moved to the onCompleted callback
  };

  if (data) {
    console.log("Signup successful", data);
    console.log("token", data.signup.token);
    // It's good practice to handle navigation or further actions here if needed
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
              <option value="" disabled>Select user type</option>
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
          {error && <Alert severity="error" className="mt-2">{getErrorMessageOrElse(error, "Couldn't register user")}</Alert>}
        </Form>
      </div>
    </div>
  );
}

export default Register;
