import React, { useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homepagephoto from "../assets/homepage-photo.jpg";


function NavBar({ onLoginClick, onRegisterClick }) {

  const { userType, userId, firstName } = useAuth();
  const token = localStorage.getItem("token");
    console.log("userType Nav: "+userType);
    console.log("userId Nav: "+userId);
    console.log("firstName Nav: "+firstName);  
    console.log("token Nav: "+token);  

  const [servicesExpanded, setServicesExpanded] = useState(false);

  const toggleServices = () => {
    setServicesExpanded(!servicesExpanded);
  };

  const { isLoggedIn, logout } = useAuth();

  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      expand="lg"
      className="custom-navbar"
    >
      <Navbar.Brand href="#home">
        <img src={homepagephoto} width={50} alt="logo" /> <b>Health Tracker</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav lg="2" className="ms-auto text-small" activeKey="home">
          <Nav.Item>
            <Nav.Link as={Link} to="/home" eventkey="home">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/services"
              eventkey="services"
              onClick={toggleServices}
            >
              Services
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about" eventkey="about">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/contactus" eventkey="contactus">
              Contact Us
            </Nav.Link>
          </Nav.Item>
          {isLoggedIn ? (
            <Nav.Item>
              <Nav.Link as={Link} to="/profile" eventKey="profile">
                <strong>Hello {firstName}</strong>
              </Nav.Link>
            </Nav.Item>
          ) : (
            <>
              <Button
                onClick={() => {
                  onRegisterClick();
                }}
                variant="outline-secondary"
                className="ms-2 text-small button-custom-padding button-text-size"
                eventkey="register"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  onLoginClick();
                }}
                variant="outline-secondary"
                className="ms-2 text-small button-custom-padding button-text-size"
                eventkey="login"
              >
                Log In
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
