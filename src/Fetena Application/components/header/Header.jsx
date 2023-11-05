import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import "./Header.css";

const activeLinkStyle = {
  border: "1.2px solid rgba(0, 100, 25, .4)",
  borderRadius: "2px",
};
function Header() {
  const [showNav, setShowNav] = useState(false);
  const showNavHandler = () => {
    setShowNav((prev) => !prev);
  };

  const optionClickHandler = () => {
    setShowNav(false);
  };
  return (
    <div className="header">
      <nav>
        <div className="logo">
          <NavLink
            to="/"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
          >
            Enat Questions
          </NavLink>
        </div>
        <div className={showNav ? "options show-options" : "options"}>
          <NavLink
            to="/questions"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
            onClick={optionClickHandler}
          >
            Get Questions
          </NavLink>
          <NavLink
            to="/post-questions"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
            onClick={optionClickHandler}
          >
            Provide Questions
          </NavLink>
          <NavLink
            to="/my-questions"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
            onClick={optionClickHandler}
          >
            My Store
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
            onClick={optionClickHandler}
          >
            About us
          </NavLink>
          <NavLink
            to="/logout"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
            onClick={optionClickHandler}
          >
            Log out
          </NavLink>
          <NavLink
            to="/user"
            style={({ isActive }) => {
              if (isActive) return activeLinkStyle;
            }}
            onClick={optionClickHandler}
          >
            Hello, nesru
          </NavLink>
        </div>
        <div className="nav-btn" onClick={showNavHandler}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
