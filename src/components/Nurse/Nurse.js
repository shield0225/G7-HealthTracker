import React, { useState } from "react";
import NavBar from "../NavBar";
import Dashboard from "./Dashboard";
import SideBar from "../SideBar";
import Stats from "./Stats";
import Symptoms from "./Symptoms";
import Notifications from "./Notifications";
import "./Nurse.css";
import Profile from "./Profile";

function Nurse() {
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
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      <NavBar />
      <div className="nurse-container">
        <SideBar setActiveComponent={setActiveComponent} />
        <div className="main-content">
          <Profile activeComponent={activeComponent} />
          {renderComponent()}
        </div>
      </div>
      ;
    </>
  );
}

export default Nurse;
