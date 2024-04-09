import React from "react";

const TeamPage = () => {
  return (
    <div>
      <h1>Our Team</h1>
      <div className="team-container">
        <div className="team-member">
          <img src="team-member-1.jpg" alt="Team Member 1" />
          <h3>John Doe</h3>
          <p>Position: Developer</p>
        </div>
        <div className="team-member">
          <img src="team-member-2.jpg" alt="Team Member 2" />
          <h3>Jane Smith</h3>
          <p>Position: Designer</p>
        </div>
        <div className="team-member">
          <img src="team-member-3.jpg" alt="Team Member 3" />
          <h3>Mike Johnson</h3>
          <p>Position: Project Manager</p>
        </div>
        <div className="team-member">
          <img src="team-member-4.jpg" alt="Team Member 4" />
          <h3>Sarah Williams</h3>
          <p>Position: QA Engineer</p>
        </div>
        <div className="team-member">
          <img src="team-member-5.jpg" alt="Team Member 5" />
          <h3>David Brown</h3>
          <p>Position: Business Analyst</p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
