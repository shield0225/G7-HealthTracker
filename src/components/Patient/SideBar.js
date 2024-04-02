import React from "react";
import "./SideBar.css";
import { Col } from "react-bootstrap";
import { VscDashboard } from "react-icons/vsc";
import { FcStatistics } from "react-icons/fc";
import { IoMdNotifications } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { RiBodyScanLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

function SideBar({ activeComponent, setActiveComponent }) {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">{/* logo here */}</div>
      <nav className="sidebar-nav">
        <a
          href
          onClick={() => setActiveComponent("Dashboard")}
          className={"side-item ${getActiveClass('Dashboard')}"}
        >
          <Col s={1}>
            <VscDashboard className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Dashboard</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("Stats")}
          className={"side-item ${getActiveClass('Stats')}"}
        >
          <Col s={1}>
            <FcStatistics className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Daily Stats</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("Symptoms")}
          className={"side-item ${getActiveClass('Symptoms')}"}
        >
          <Col s={1}>
            <RiBodyScanLine className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Symptoms</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("Notifications")}
          className={"side-item ${getActiveClass('Notifications')}"}
        >
          <Col s={1}>
            <IoMdNotifications className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Notifications</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("PersonalInfo")}
          className={"side-item ${getActiveClass('PersonalInfo')}"}
        >
          <Col s={1}>
            <IoPerson className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Personal Info</span>
          </Col>
        </a>

        <div className="sidebar-footer">
          <a href="/home" className="side-item" onClick={logout}>
            <Col s={1}>
              <FaSignOutAlt className="side-icon" />
            </Col>
            <Col xs={11}>
              <span className="label">Log out</span>
            </Col>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default SideBar;
