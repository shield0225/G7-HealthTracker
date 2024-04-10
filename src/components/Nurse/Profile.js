import React from "react";

function Profile({ activeComponent }) {
  return (
    <div className="card">
      <div className="profile-header">
        {" "}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqM0CvKDZXfAQiR0hyaAXlAXXSOg_t2nzlg&s"
          alt="Profile"
          className="profile-image"
        />
        <h1 className="profile-title">{activeComponent}</h1>
      </div>
    </div>
  );
}

export default Profile;
