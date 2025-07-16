// ThingsToDoSriLanka.jsx
import React from "react";
import "./ThingsToDo.css";
import { Search } from "lucide-react";

const ThingsToDo = () => {
  return (
    <div className="container">
      <div className="background-image"></div>
      <div className="header">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="search text" />
        </div>
      </div>
      <div className="content">
        <h1>Things to do in Sri Lanka</h1>
        <p>
          Discover the heart of Sri Lanka—authentic, diverse, and unforgettable.
          Let us help you plan the perfect trip with local insights, expert tips, and hidden gems.
          From where to eat to must-see sights, we’ve got you covered.
          Your next favorite memory starts here!
        </p>
      </div>
    </div>
  );
};

export default ThingsToDo;
