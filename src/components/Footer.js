import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <Container fluid="md">
      <Row className="text-medium row-title">
        <Col xs={4} md={3} className="text-md-center">
          <FontAwesomeIcon className="icon-spacing" icon={faPaw} />
        </Col>
        <Col xs={4} md={2}>
          <b>Company</b>
        </Col>
        <Col xs={4} md={2}>
          <b>Legal</b>
        </Col>
        <Col xs={4} md={2}>
          <b>Help</b>
        </Col>
        <Col xs={4} md={3}>
          <b>Social</b>
        </Col>
      </Row>
      <Row className="text-small">
        <Col xs={4} md={3}></Col>
        <Col xs={4} md={2}>
          About Us FAQ
        </Col>
        <Col xs={4} md={2}>
          Privacy Policy
        </Col>
        <Col xs={4} md={2}>
          Contact Support
        </Col>
        <Col xs={4} md={3}>
          Follow Us
        </Col>
      </Row>
      <Row className="text-small">
        <Col xs={4} md={3}></Col>
        <Col xs={4} md={2}>
          Contact
        </Col>
        <Col xs={4} md={2}>
          Terms and Conditions
        </Col>
        <Col xs={4} md={2}>
          FAQs
        </Col>
        <Col className="text-large" xs={4} md={3}>
          <FontAwesomeIcon className="icon-spacing" icon={faInstagram} />
          <FontAwesomeIcon className="icon-spacing" icon={faFacebook} />
          <FontAwesomeIcon className="icon-spacing" icon={faXTwitter} />
        </Col>
      </Row>
      <Container className="text-medium">
        <footer className="footer">
          <div className="container">
            <span className="text-muted">Copyright &copy; Group 7 - 2024</span>
          </div>
        </footer>
      </Container>
    </Container>
  );
}

export default Footer;
