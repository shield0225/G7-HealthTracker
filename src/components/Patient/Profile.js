import React from "react";
import { Row, Col } from "react-bootstrap";

function Profile({ activeComponent }) {
  return (
    <div className="card">
      <Row>
        <Col>
          <div className="profile-header">
            {" "}
            <img
              src="https://image.kpopmap.com/2019/03/jisoo_profile_s_0215.jpg"
              alt="Profile"
              className="profile-image"
            />
            <h1 className="profile-title">{activeComponent}</h1>
          </div>
        </Col>
        <Col>
          <div className="profile-info">
            <h2>Jisoo</h2>
            <p>Age: 26</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
