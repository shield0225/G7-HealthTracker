import React from "react";
import "./SideBar.css";
import { Col } from "react-bootstrap";
import { VscDashboard } from "react-icons/vsc";
import { FcStatistics } from "react-icons/fc";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { CiSquareQuestion } from "react-icons/ci";
import { RiBodyScanLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

function SideBar({ activeComponent, setActiveComponent }) {
  //const getActiveClass = (name) => activeComponent === name ? "active" : "";

  return (
    <div className="sidebar">
      <div className="sidebar-logo">{/* logo here */}</div>
      <nav className="sidebar-nav">
        <a
          href
          onClick={() => setActiveComponent("Dashboard")}
          className={"side-item ${getActiveClass('Dashboard')}"}
        >
          <Col s={2}>
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
          <Col s={2}>
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
          <Col s={2}>
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
          <Col s={2}>
            <IoMdNotifications className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Notifications</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("Requests")}
          className={"side-item ${getActiveClass('Requests')}"}
        >
          <Col s={2}>
            <CiSquareQuestion className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Requests</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("Preferences")}
          className={"side-item ${getActiveClass('Preferences')}"}
        >
          <Col s={2}>
            <MdOutlineRoomPreferences className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Preferences</span>
          </Col>
        </a>
        <a
          href
          onClick={() => setActiveComponent("PersonalInfo")}
          className={"side-item ${getActiveClass('PersonalInfo')}"}
        >
          <Col s={2}>
            <IoPerson className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Personal Info</span>
          </Col>
        </a>
      </nav>
      <div className="sidebar-footer">
        <a href="/logout" className="side-item">
          <Col s={2}>
            <FaSignOutAlt className="side-icon" />
          </Col>
          <Col xs={11}>
            <span className="label">Log out</span>
          </Col>
        </a>
      </div>
    </div>
  );
}

export default SideBar;
