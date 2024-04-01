import React from "react";

function Profile({ activeComponent }) {
  return (
    <div className="card">
      <div className="profile-header">
        {" "}
        <img
          src="https://image.kpopmap.com/2019/03/jisoo_profile_s_0215.jpg"
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-title">{activeComponent}</h1>
      </div>
    </div>
  );
}

export default Profile;
