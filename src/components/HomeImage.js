import React from "react";
import Image from "react-bootstrap/Image";
import homepagephoto from "../assets/homepage-photo.jpg";
import "../App.css";

function HomeImage() {
  return (
    <div
      className="image-container"
      style={{ position: "relative", display: "inline-block" }}
    >
      <Image
        className="img-fluid semi-transparent"
        src={homepagephoto}
        alt="placeholder"
        style={{ width: "100%", height: 500 }}
      />
    </div>
  );
}

export default HomeImage;
