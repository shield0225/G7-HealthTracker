import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";
import homepagephoto from "../assets/homepage-photo.jpg";

function NavBar() {
  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg">
      <Navbar.Brand href="#home">
        <img src={homepagephoto} width={50} alt="logo" /> <b>Health Tracker</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav xs lg="2" className="ms-auto text-small" activeKey="home">
          <Nav.Item>
            <Nav.Link as={Link} to="/home" eventKey="home">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/services" eventKey="services">
              Services
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about" eventKey="about">
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/contactus" eventKey="contactus">
              Contact Us
            </Nav.Link>
          </Nav.Item>
          <Button
            variant="outline-secondary"
            className="ms-2 text-small button-custom-padding button-text-size"
            as={Link}
            to="/register"
            eventKey="signup"
          >
            Sign Up
          </Button>
          <Button
            variant="outline-secondary"
            className="ms-2 text-small button-custom-padding button-text-size"
            as={Link}
            to="/login"
            eventKey="login"
          >
            Log In
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
