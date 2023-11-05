import React from "react";

import styles from "./PopUp.module.css";

const PopUp = ({ text, onYes, onCancel, popStyle }) => {
  return (
    <div
      className={`${styles["pop-up"]} ${popStyle}`}
      onClick={(event) => {
        // HOW TO PREVENT EVNET PROPAGATION IN REACT ?
        return;
      }}
    >
      <p>{text}</p>
      <div className={styles["btns-cont"]}>
        <button className={styles["yes"]} onClick={onYes}>
          Yes
        </button>
        <button className={styles["cancel"]} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopUp;
