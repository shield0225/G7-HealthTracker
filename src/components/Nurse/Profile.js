import React from "react";

function Profile({ activeComponent }) {
  return (
    <div className="card">
      <div className="profile-header">
        {" "}
        <img
          src="https://d29fhpw069ctt2.cloudfront.net/clipart/99148/preview/patient_preview_804a.png"
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-title">{activeComponent}</h1>
      </div>
    </div>
  );
}

export default Profile;
