import React from "react";
import "./TeamPage.css";
import NavBar from "./NavBar";
import { Container } from "react-bootstrap";

const TeamPage = () => {
  return (
    <Container>
      <NavBar />
      <br />
      <h1 className="title-center">Our Team</h1>
      <div className="team-container">
        <div className="team-member">
          <img
            src="https://media.licdn.com/dms/image/D5603AQE6XsJRFj6xvg/profile-displayphoto-shrink_400_400/0/1684426140862?e=1718236800&v=beta&t=PL_VyfnwdiN6Q6n-O5GUJ4lSJl6-tyU47X6vsWjhq_0"
            alt="Team Member 1"
          />
          <h4>Aileen Salcedo</h4>
          <p>Front-end Developer</p>
        </div>
        <div className="team-member">
          <img
            src="https://media.licdn.com/dms/image/C4D03AQEskETVobbb-A/profile-displayphoto-shrink_400_400/0/1555616734534?e=1718236800&v=beta&t=ZiN-kehKi8Pa2KJq16xJA4Vbmr9XnWnmNu_PfHhhdV0"
            alt="Team Member 2"
          />
          <h4>Maxwell Nogueira Santana</h4>
          <p>Front-end Developer</p>
        </div>
        <div className="team-member">
          <img
            src="https://media.licdn.com/dms/image/C5603AQEWpPhWP0xG6Q/profile-displayphoto-shrink_400_400/0/1654092496749?e=1718236800&v=beta&t=eeqHsqDxm40An3M0Q8_fiHt7wHJPKBfIZpf_cABpZhM"
            alt="Team Member 3"
          />
          <h4>Josue Rojas Ruiz</h4>
          <p>Front-end Developer</p>
        </div>
        <div className="team-member">
          <img
            src="https://media.licdn.com/dms/image/D5603AQHNXJC4wvTskA/profile-displayphoto-shrink_400_400/0/1646382509481?e=1718236800&v=beta&t=rYi2my9JGJjiwWiYOuVFTeN6WerKrGCTVtfkvDgtEEc"
            alt="Team Member 4"
          />
          <h4>Maria Navarette</h4>
          <p>QA Engineer</p>
        </div>
        <div className="team-member">
          <img
            src="https://media.licdn.com/dms/image/C4E03AQF-5AzN3Eg8VQ/profile-displayphoto-shrink_400_400/0/1597885308706?e=1718236800&v=beta&t=7PBu_KM2C_0nod2wXqn1fiSYmIsjp2h5sHf1z-nskbc"
            alt="Team Member 5"
          />
          <h4>Sebastian Silva Benites</h4>
          <p>Back-end Developer</p>
        </div>
      </div>
    </Container>
  );
};

export default TeamPage;
