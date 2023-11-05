import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

import useUserContext from "../contexts/user.context";

import "./Header.css";

function Header() {
  const [auth, auth_dispatch] = useUserContext();
  const activeStyle = {
    textDecoration: "underline",
    textUnderlineOffset: ".4rem",
    textDecorationColor: "red",
  };

  const logout_handler = () => {
    auth_dispatch({
      type: "LOGOUT",
      payload: {
        token: null,
        user_id: "",
        username: "",
      },
    });
  };

  return (
    <div className="header">
      <div className="logo">
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : null;
          }}
          to="/"
        >
          Ng
        </NavLink>
      </div>
      <div className="options">
        {auth.token ? (
          ""
        ) : (
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
            to="/sign-in"
          >
            Sign-in
          </NavLink>
        )}

        {auth.token ? (
          ""
        ) : (
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
            to="/sign-up"
          >
            Sign-up
          </NavLink>
        )}

        {!auth.token ? (
          ""
        ) : (
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
            to="/user"
          >
            Hello, {auth.username}
          </NavLink>
        )}

        {!auth.token ? (
          ""
        ) : (
          <NavLink
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
            to="/create"
          >
            Create
          </NavLink>
        )}

        {!auth.token ? (
          ""
        ) : (
          <NavLink
            onClick={(e) => {
              logout_handler();
            }}
            to={"/sign-in"}
          >
            Logout
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
