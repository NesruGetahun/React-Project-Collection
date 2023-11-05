import React from "react";

import "./Button.css";
const Button = ({ title, onClick, style }) => {
  return (
    <div className="btn-cont">
      <button style={style} onClick={onClick}>{title}</button>
    </div>
  );
};

export default Button;
