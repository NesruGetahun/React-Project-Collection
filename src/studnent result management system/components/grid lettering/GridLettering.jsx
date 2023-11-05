import React from "react";

import styles from "./GridLettering.module.css";
const GridLettering = ({ word, letter_styles, container_styles }) => {
  return (
    <h1 className={styles["header"]} style={{ ...container_styles }}>
      {word.split("").map((letter, index) => {
        let letterStyle = { ...letter_styles };
        if (letter === " " || letter === "-") {
          letterStyle.border = "none";
          letterStyle.boxShadow = "none";
        }

        return (
          <span key={letter + index} style={letterStyle}>
            {letter}
          </span>
        );
      })}
    </h1>
  );
};

export default GridLettering;
