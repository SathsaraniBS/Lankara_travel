import React from "react";
import "./Services.css";

const services = [
  { name: "Beach Holiday", image: "/images/beach.jpg" },
  { name: "Misty Mountains", image: "/images/mountain.jpg" },
  { name: "History and Culture", image: "/images/history.jpg" },
  { name: "Safaris", image: "/images/safari.webp" },
  { name: "Back Packing", image: "/images/backpack.jpg" },
  { name: "Updates", image: "/images/update.jpg" },
];

const Services = () => {
  return (
    <div className="services-container">
      <h2>Find our services</h2>
      <p>Safety, value and expertise is our guarantee</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.image} alt={service.name} />
            <div className="service-title">"{service.name}"</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
