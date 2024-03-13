import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import NavBar from "./NavBar";
import HomeImage from "./HomeImage";
import Features from "./Features";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import "../App.css";

function Home(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <Container>
      <NavBar
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <div className="home-content">
        <HomeImage />
        {showLogin && <Login closeLogin={() => setShowLogin(false)} />}
        {showRegister && (
          <Register closeRegister={() => setShowRegister(false)} />
        )}
      </div>
      <h1 className="title-center">
        Empowering Patient Care Beyond the Hospital
      </h1>
      <p className="text-center text-med">
        Seamless monitoring and daily health management for patients and nurses.
      </p>
      <Features />
      <br />
      <Footer />
    </Container>
  );
}

export default Home;
