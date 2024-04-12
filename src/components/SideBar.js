import React from "react";
import "./SideBar.css";
import { Col } from "react-bootstrap";
import { VscDashboard } from "react-icons/vsc";
import { FcStatistics } from "react-icons/fc";
import { IoMdNotifications } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { RiBodyScanLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "./Auth/AuthContext";

function SideBar({ activeComponent, setActiveComponent }) {
  const { logout } = useAuth();

  const getActiveClass = (componentName) =>
    activeComponent === componentName ? "active" : "";

  return (
    <div className="sidebar">
      <div className="sidebar-logo">{/* logo here */}</div>
      <nav className="sidebar-nav">
        <button
          className={`side-item ${getActiveClass("Dashboard")}`}
          onClick={() => setActiveComponent("Dashboard")}
        >
          <Col s={1}>
            <VscDashboard className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Dashboard</span>
          </Col>
        </button>
        <button
          className={`side-item ${getActiveClass("Stats")}`}
          onClick={() => setActiveComponent("Stats")}
        >
          <Col s={1}>
            <FcStatistics className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Daily Stats</span>
          </Col>
        </button>
        <button
          className={`side-item ${getActiveClass("Symptoms")}`}
          onClick={() => setActiveComponent("Symptoms")}
        >
          <Col s={1}>
            <RiBodyScanLine className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Symptoms</span>
          </Col>
        </button>
        <button
          className={`side-item ${getActiveClass("Notifications")}`}
          onClick={() => setActiveComponent("Notifications")}
        >
          <Col s={1}>
            <IoMdNotifications className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Notifications</span>
          </Col>
        </button>
        <button
          className={`side-item ${getActiveClass("PersonalInfo")}`}
          onClick={() => setActiveComponent("PersonalInfo")}
        >
          <Col s={1}>
            <IoPerson className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Personal</span>
          </Col>
        </button>
        <div className="sidebar-footer">
          <button className="side-item" onClick={logout}>
            <Col s={1}>
              <FaSignOutAlt className="side-icon" />
            </Col>
            <Col xs={11}>
              <span className="label">Log out</span>
            </Col>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
