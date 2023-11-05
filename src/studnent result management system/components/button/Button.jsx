import React from "react";

import styles from "./Button.module.css";
const Button = ({
  text,
  btnStyles,
  onClickHandler,
  containerStyle,
  className_btn,
}) => {
  return (
    <div className={styles["btn-container"]} style={{ ...containerStyle }}>
      <button
        style={{ ...btnStyles }}
        onClick={onClickHandler}
        className={className_btn}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
