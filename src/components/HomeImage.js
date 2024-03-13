import React from "react";
import Image from "react-bootstrap/Image";
import homepagephoto from "../assets/homepage-photo.jpg";
import "../App.css";

function HomeImage() {
  return (
    <div className="image-container">
      <Image
        className="img-fluid semi-transparent home-image"
        // src={homepagephoto}
        src={
          "https://img.freepik.com/free-photo/female-nurse-talking-with-old-woman-with-alzheimer-nursing-home_482257-20723.jpg?w=1060&t=st=1710288397~exp=1710288997~hmac=d8adce1f3bdf456ba26931c772df22cd2ab8c208a0a273076779c0fb80b37f05"
        }
        alt="placeholder"
      />
    </div>
  );
}

export default HomeImage;
