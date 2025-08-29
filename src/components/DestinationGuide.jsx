import React from "react";
import "./DestinationGuide.css";

const destinations = [
  {
    name: "COLOMBO",
    description: "Urban & Nightlife",
    image: "images/colombo.jpg",
  },
  {
    name: "GALLE",
    description: "Heritage & Beaches",
    image: "images/galle.jpg",
  },
  {
    name: "KANDY",
    description: "History & Culture",
    image: "images/Kandy.jpg",
  },
  {
    name: "TRINCOMALEE",
    description: "Nature & Adventure",
    image: "images/Trincomalee.jpg",
  },

  {
    name: "Nuwara Eliya",
    description: "Nature & Adventure",
    image: "images/nuwaraeliya.webp",
  },

  {
    name: "Jaffna",
    description: "Culture & Nature",
    image: "images/jaffna.jpg",
  },
  
  {
    name: "Ella",
    description: "Nature & Adventure",
    image: "images/ella.jpg",
  },

  {
    name: "Sigiriya",
    description: "History & Culture",
    image: "images/sigiriya.jpg",
  },

  {
    name: "Anuradhapura",
    description: "History & Culture",
    image: "images/anuradhapura.jpg",
  },
  
  
];

const DestinationGuide = () => {
  return (
    <div className="destination-container">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Destination Guide</h1>
        <p className="subtitle">Holiday in Sri Lanka</p>

        <div className="destination-province">
          <h2 style={{color:"gray"}}>Western Province</h2>
        </div>

        <div className="destination-grid">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="destination-card"
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="destination-overlay">
                <h2>{dest.name}</h2>
                <p>{dest.description}</p>
                <button className="like-btn">❤</button>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default DestinationGuide;
