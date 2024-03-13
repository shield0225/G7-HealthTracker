import React from "react";
import NavBar from "../NavBar";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import "./Patient.css";

function Patient() {
  return (
    <>
      <NavBar />
      <div className="patient-container">
        <SideBar />
        <Dashboard />
      </div>
      ;
    </>
  );
}

export default Patient;
