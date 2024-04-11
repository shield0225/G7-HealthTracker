import React, { useState } from "react";
import NavBar from "../NavBar";
import SideBar from "../SideBar";
import Dashboard from "./Dashboard";
import Stats from "./Stats";
import Symptoms from "./Symptoms";
import Notifications from "./Notifications";
import "./Patient.css";
import Profile from "./Profile";
import Settings from "./Settings";
import { Container } from "react-bootstrap";

function Patient() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Stats":
        return <Stats />;
      case "Symptoms":
        return <Symptoms />;
      case "Notifications":
        return <Notifications />;
      case "Profile":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      {" "}
      <Container>
        <NavBar />
        <div className="patient-container">
          <SideBar setActiveComponent={setActiveComponent} />
          <div className="main-content">
            <Profile activeComponent={activeComponent} />
            {renderComponent()}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Patient;
