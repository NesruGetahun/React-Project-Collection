import React from "react";

import "./Input.css";
const Input = ({
  id,
  placeholder,
  color,
  fontSize,
  bg,
  minWidth,
  maxWidth,
  type,
  questionState,
  questionDispatch,
  input_type,
  index,
  inputStyle,
  labelStyle,
}) => {
  const print = console.log;
  const getInitail = () => {
    switch (type) {
      case "GENERAL_TITLE":
        return questionState.generalTitle;
      case "GRADE_CATAGORY_[1]":
        return questionState.educationLevelCatagory[1];
      case "SUBJECT_CATAGORY_[1]":
        return questionState.subjectCatagory[1];
      case "QUESTION_TYPE_[1]":
        return questionState.questions.at(-1).questionType[1];
      case "QUESTION_ANSWER":
        return questionState.questions.at(-1).questionAnswer;
      default:
        return "";
    }
  };
  const setValue = (value) => {
    switch (type) {
      case "GENERAL_TITLE":
        return questionDispatch({ type, payload: value });
      case "GRADE_CATAGORY_[1]":
        return questionDispatch({ type, payload: value });
      case "SUBJECT_CATAGORY_[1]":
        return questionDispatch({ type, payload: value });
      case "QUESTION_TYPE_[1]":
        return questionDispatch({ type, payload: +value });
      case "QUESTION_ANSWER":
        return questionDispatch({ type, payload: value });
      default:
        return "";
    }
  };
  const value = getInitail();
  return (
    <div className="input-cont">
      <input
        type={input_type}
        id={id}
        min={2}
        max={25}
        placeholder=""
        style={inputStyle}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <label style={labelStyle} htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
