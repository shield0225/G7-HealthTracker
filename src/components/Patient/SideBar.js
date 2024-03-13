import React from "react";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">{/* logo here */}</div>
      <nav className="sidebar-nav">
        <a href="/patient-dashboard" className="side-item active">
          Dashboard
        </a>
        <a href="/personal" className="side-item">
          Personal
        </a>
        <a href="/stats" className="side-item">
          Enter Daily Stats
        </a>
        <a href="/symptoms" className="side-item">
          Symptoms
        </a>
        <a href="/preferences" className="side-item">
          Preferences
        </a>
        <a href="/notifications" className="side-item">
          Notifications
        </a>
        <a href="/requests" className="side-item">
          Special Requests
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
