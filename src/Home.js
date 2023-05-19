import './Home.css';
import React from "react";

function Home() {
  const handleGetStarted = () => {
    window.location = '/search';
  };

  return (
    <div className="background-image">
      <div >
        <h1
          className="Title-h1"
        >
         Validate&nbsp;&nbsp;the&nbsp;&nbsp;Authenticity<br></br>of&nbsp;&nbsp;a&nbsp;&nbsp;Certificate
        </h1>
        <h2 style={{ marginLeft: "40px", paddingRight: "50px" ,color:"gray",fontSize:"20px"}}>
          ❝ Website for Checking Standards Certification
        </h2>
        <h3 style={{ marginLeft: "40px", marginRight: "40rem" ,paddingTop:"7px",color:"gray",fontSize:"20px"}}>
          of Products and Services ❞&emsp;
        </h3>
        <h3 id='h3-btn' style={{ marginLeft: "40px", marginRight: "40rem" ,paddingTop:"40px",color:"gray",fontSize:"33px"}}>
↳&emsp;
        <button
            className="btn-4"
            type="button"
            style={{fontSize:"20px"}}
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          &emsp;🧸 🫧
        </h3>
      </div>
    </div>
  );
}

export default Home;