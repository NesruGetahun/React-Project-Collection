import React from "react";

import "./Textarea.css";
const Textarea = ({
  id,
  placeholder,
  textareaStyle,
  labelStyle,
  type,
  questionState,
  questionDispatch,
  index,
}) => {
  const getInitail = () => {
    switch (type) {
      case "SHORT_DESCRIPTION":
        return questionState.shortDescription;
      case "LONG_DESCRIPTION":
        return questionState.longDescription;
      case "QUESTION_TEXT": {
        return questionState.questions.at(-1).questionText;
      }
      case "QUESTION_OPTION":
        return questionState.questions.at(-1)?.options?.at(index);
      case "QUESTION_ANSWER":
        return questionState.questions.at(-1).questionAnswer;

      default:
        return "";
    }
  };
  const setValue = (value) => {
    switch (type) {
      case "SHORT_DESCRIPTION":
        return questionDispatch({ type, payload: value });
      case "LONG_DESCRIPTION":
        return questionDispatch({ type, payload: value });
      case "QUESTION_TEXT":
        return questionDispatch({ type, payload: value });
      case "QUESTION_OPTION":
        return questionDispatch({ type, payload: { value, index } });
      case "QUESTION_ANSWER":
        return questionDispatch({ type, payload: value });
      default:
        return "";
    }
  };
  const value = getInitail();

  return (
    <div className="textarea-cont">
      <textarea
        id={id}
        placeholder=""
        style={textareaStyle}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        contentEditable="true"
      ></textarea>
      <label style={labelStyle} htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
};

export default Textarea;
