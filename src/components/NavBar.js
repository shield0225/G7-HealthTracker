import React from "react";
import { Nav, Navbar, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homepagephoto from "../assets/homepage-photo.jpg";

function NavBar({ onLoginClick, onRegisterClick }) {
  const { isLoggedIn, logout, userDetails } = useAuth();

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
      <Navbar.Collapse className="flex-column">
        <Nav className="ms-auto text-small" activeKey="home">
          {isLoggedIn && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/home" eventkey="home">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to={userDetails?.userType === "nurse" ? "/nurse" : "/patient"}
                  eventkey="profile"
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/game" eventkey="game">
                  Games
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/teampage" eventkey="teampage">
                  Team Page
                </Nav.Link>
              </Nav.Item>

              {/* User-specific dropdown */}
              <Dropdown as={Nav.Item} align="end" className="nav-item">
                <Dropdown.Toggle as={Nav.Link}>
                  Welcome,
                  <strong>{`${userDetails?.firstName} ${userDetails?.lastName}`}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="logout"
                    onClick={logout}
                    className="nav-item"
                    align="end"
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}

          {/* Buttons for non-logged-in users */}
          {!isLoggedIn && (
            <>
              <Button
                onClick={onRegisterClick}
                variant="outline-secondary"
                className="ms-2 text-small button-custom-padding button-text-size"
                eventkey="register"
              >
                Sign Up
              </Button>
              <Button
                onClick={onLoginClick}
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
