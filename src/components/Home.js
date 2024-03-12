import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import NavBar from "./NavBar";
import HomeImage from "./HomeImage";
import Features from "./Features";

function Home(props) {
  return (
    <Container>
      <NavBar />
      <br />
      <HomeImage />
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
