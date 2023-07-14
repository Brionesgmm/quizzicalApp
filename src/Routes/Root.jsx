import React from "react";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <div className="startSection">
      <h1>Quizzical</h1>
      <p>Test Your Knowledge!</p>
      <Link to="/quiz">
        <button className="startBtn">Start quiz</button>
      </Link>
    </div>
  );
};

export default Root;
