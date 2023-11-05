import React, { useState } from "react";

import styles from "./Input.module.css";
const Input = ({
  id,
  labelText,
  type = "text",
  inputStyles,
  labelStyle,
  onChangeHandler,
  value,
  input_cs,
  label_cs,
  step = 1,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const showEye = type === "password";
  return (
    <div className={styles["input-container"]}>
      <input
        type={showPassword ? "text" : type}
        id={id}
        placeholder=""
        onChange={onChangeHandler}
        value={value}
        style={{ ...inputStyles }}
        step={step}
        className={input_cs}
      />
      <label htmlFor="id" style={{ ...labelStyle }} className={label_cs}>
        {labelText}
      </label>
      {showEye && (
        <span
          className={styles["lock"]}
          onClick={(event) => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "🔓" : "🔒"}
        </span>
      )}
    </div>
  );
};

export default Input;
