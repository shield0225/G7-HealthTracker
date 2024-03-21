import React, { useState } from "react";
import NavBar from "../NavBar";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard"
import Stats from "./Stats";
import Symptoms from "./Symptoms";
import Notifications from "./Notifications";
import "./Patient.css";

function Patient() {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

const renderComponent = () => {
  switch (activeComponent) {
    case 'Dashboard':
      return <Dashboard />;
    case 'Stats':
      return <Stats />;
    case 'Symptoms':
      return <Symptoms />;
    case 'Notifications':
      return <Notifications />;
    default:
      return <Dashboard />;
  }
};
return (
    <>
      <NavBar />
      <div className="patient-container">
        <SideBar setActiveComponent={setActiveComponent} />
        {renderComponent()}
      </div>
      ;
    </>
  );
}

export default Patient;
