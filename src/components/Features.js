import React from "react";
import { Row, Image, Container, Col } from "react-bootstrap";
import "../App.css";

function Features() {
  return (
    <Container className="text-center">
      <h2 className="title">Key Features</h2>
      <Row>
        <Col md={{ span: 2, offset: 3 }}>
          <Image
            className="image-size"
            src="https://www.letscale.com/wp-content/uploads/2020/09/electronichealthrecordsecurity_ce6d37f0ad9ae66183c7386ac5997cd8_2000.jpg"
            rounded
          />
          <br />
          <p className="text-small">Real-Time Health Tracking</p>
        </Col>
        <Col md={{ span: 2 }}>
          <Image
            className="image-size"
            src="https://www.jotform.com/blog/wp-content/uploads/2022/03/message-04.png"
            rounded
            width="200"
          />
          <p className="text-small">Secure Nurse-Patient Communication</p>
          <br />
        </Col>
        <Col md={{ span: 2 }}>
          <Image
            className="image-size"
            src="https://static.scientificamerican.com/sciam/cache/file/01C9741F-6F6D-4882-8217D92370325AA7_source.jpg?w=900"
            width="200"
            rounded
          />
          <p className="text-small">Intelligent Symptom Analysis</p>
          <br />
        </Col>
      </Row>
      <br />
    </Container>
  );
}

export default Features;
