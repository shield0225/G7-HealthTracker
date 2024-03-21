import React from "react";
import "./SideBar.css";


function SideBar({ activeComponent, setActiveComponent }) {
  //const getActiveClass = (name) => activeComponent === name ? "active" : "";

  return (
    <div className="sidebar">
      <div className="sidebar-logo">{/* logo here */}</div>
      <nav className="sidebar-nav">
      <a href  onClick={() => setActiveComponent('Dashboard')} className={"side-item ${getActiveClass('Dashboard')}"}>Dashboard</a>
        <a href onClick={() => setActiveComponent('Stats')} className={"side-item ${getActiveClass('Stats')}"}>Enter Daily Stats</a>
        <a href onClick={() => setActiveComponent('Symptoms')} className={"side-item ${getActiveClass('Symptoms')}"}>
          Symptoms
        </a>
        <a href onClick={() => setActiveComponent('Notifications')} className={"side-item ${getActiveClass('Notifications')}"}>
          Notifications
        </a>
        <a href onClick={() => setActiveComponent('Requests')} className={"side-item ${getActiveClass('Requests')}"}>
          Special Requests
        </a>
        <a href onClick={() => setActiveComponent('Preferences')} className={"side-item ${getActiveClass('Preferences')}"}>
          Preferences
        </a>
        <a href onClick={() => setActiveComponent('PersonalInfo')} className={"side-item ${getActiveClass('PersonalInfo')}"}>
          Profile
        </a>
      </nav>
      <div className="sidebar-footer">
        <a href="/logout" className="side-item">
          Log out
        </a>
      </div>
    </div>
  );
}

export default SideBar;
