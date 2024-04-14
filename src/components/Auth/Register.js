import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../Utils/graphQLService";
import "./Login.css";
import { Form, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { validateRegistration } from "../Validation";

function Register() {
  const [errors, setErrors] = useState({});

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "patient",
    dateOfBirth: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      signup({ variables: formData })
        .then((data) => {
          setFormData(initialState);
        })
        .catch((error) => {
          // Signup unsuccessful
          const message =
            error.graphQLErrors?.[0]?.message ||
            "An unexpected error occurred.";
          setErrors({ ...errors, signup: message });
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
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
            </Col>
            <Col>
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
            </Col>
          </Row>
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
          <Row>
            <Col>
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
            </Col>
            <Col>
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
                </Form.Control>
              </Form.Group>
            </Col>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </Row>
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
          <div className="button-container">
            <Button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>{" "}
          </div>
          <div className="button-container">
            {data && (
              <div className="success-message">
                Signup successful! Please <strong>login</strong>.
              </div>
            )}
            {error && (
              <div className="error-message">Error: {error.message}</div>
            )}
          </div>{" "}
        </Form>
      </div>
    </div>
  );
}

export default Register;
