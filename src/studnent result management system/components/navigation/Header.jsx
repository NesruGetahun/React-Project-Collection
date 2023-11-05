import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

import styles from "./Header.module.css";
import GridLettering from "../grid lettering/GridLettering";
import useUserContext from "../../context/userContex";
import ACTION_TYPE from "../../context/userReducer";
const Header = () => {
  const activeStyle = { backgroundColor: "rgb(189, 255, 179)" };
  // rgb(189, 255, 179)
  const [showOptions, setShowOptions] = useState(false);
  const [signout, setSignout] = useState(false);
  const [userState, userDispatch] = useUserContext();
  if (signout || userState.id === "" || userState.id === undefined) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <header>
      <div className={styles["logo"]}>
        <NavLink
          to="/"
          onClick={(event) => {
            setShowOptions(false);
          }}
        >
          <GridLettering
            word={"ng"}
            letter_styles={{
              transform: "skew(5deg, -25deg)",
              color: "rgba(10, 200, 10, .8)",
              border: "1px solid rgba(0, 0, 0, .2)",
              marginRight: "-.8rem",
              textShadow: "0 0 .2rem rgba(0, 0, 0, .1)",
              backgroundColor: "white",
            }}
          />
        </NavLink>
      </div>
      <div className={styles["options"]}>
        <ul
          style={{
            transform: showOptions ? "translate(0)" : "",
          }}
        >
          <li>
            <NavLink
              to="/get-records"
              style={({ isActive }) => (isActive ? activeStyle : {})}
              onClick={(event) => {
                setShowOptions(false);
              }}
            >
              Get Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-record"
              style={({ isActive }) => (isActive ? activeStyle : {})}
              onClick={(event) => {
                setShowOptions(false);
              }}
            >
              Create Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-out"
              style={({ isActive }) => (isActive ? activeStyle : {})}
              onClick={(event) => {
                event.preventDefault();
                setShowOptions(false);
                setSignout(true);
                userDispatch({
                  type: ACTION_TYPE.SIGN_OUT,
                });
              }}
            >
              sign-out
            </NavLink>
          </li>
        </ul>

        <div
          className={styles["menu-btn"]}
          onClick={(event) => {
            setShowOptions((prev) => !prev);
          }}
        >
          {Array(4)
            .fill(1)
            .map((item, i) => (
              <span key={i}></span>
            ))}
        </div>
      </div>

      <div
        className={styles["overlay"]}
        style={{ transform: showOptions ? "scale(17, 15)" : "" }}
      ></div>
    </header>
  );
};

export default Header;
