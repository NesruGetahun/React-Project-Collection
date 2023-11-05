import React, { useState } from "react";

import "./Select.css";
import Input from "../input/Input";
import { questionTypesOptions } from "../../../constant/post-question";
const Select = ({
  id,
  placeholder,
  options,
  type,
  questionState,
  questionDispatch,
  dropStyle,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const getInitail = () => {
    switch (type) {
      case "GRADE_CATAGORY":
        return questionState.educationLevelCatagory[0];
      case "SUBJECT_CATAGORY":
        return questionState.subjectCatagory[0];
      case "DIFFICALITY_CATAGORY":
        return questionState.questionDifficalityCatagory;
      case "QUESTION_TYPE":
        return questionState.questions.at(-1)?.questionType[0];

      default:
        return "";
    }
  };
  const setValue = (option) => {
    switch (type) {
      case "GRADE_CATAGORY":
        return questionDispatch({ type, payload: [option, ""] });
      case "SUBJECT_CATAGORY":
        return questionDispatch({ type, payload: [option, ""] });
      case "DIFFICALITY_CATAGORY":
        return questionDispatch({ type, payload: option });
      case "QUESTION_TYPE":
        return questionDispatch({ type, payload: [option, ""] });

      default:
        return "";
    }
  };
  const value = getInitail();

  return (
    <>
      <div className="select-cont">
        <input
          type="text"
          id={id}
          placeholder=""
          value={value}
          readOnly
          onClick={(e) => {
            setShowOptions((prev) => !prev);
          }}
        />

        <div
          className={showOptions ? "options show-options" : "options"}
          style={dropStyle}
        >
          {options.map((option) => {
            return (
              <p
                key={option}
                onClick={(e) => {
                  setValue(option);
                  setShowOptions(false);
                }}
              >
                {option}
              </p>
            );
          })}
        </div>

        <label htmlFor={id}>{placeholder}</label>
      </div>
      {value === "Others" ? (
        <div className="other-cont">
          <Input
            id={id + "-other"}
            placeholder="Subject's name"
            type="SUBJECT_CATAGORY_[1]"
            questionState={questionState}
            questionDispatch={questionDispatch}
            input_type="text"
            index=""
            inputStyle={{
              backgroundColor: "rgba(250, 250, 0, .4)",
              minWidth: "180px",
              maxWidth: "400px",
            }}
          />
        </div>
      ) : (
        ""
      )}
      {value === "University 1st degree" ||
      value === "University 2nd degree" ? (
        <div className="other-cont">
          <Input
            id={id + "-other"}
            placeholder="Department's name"
            type="GRADE_CATAGORY_[1]"
            questionState={questionState}
            questionDispatch={questionDispatch}
            input_type="text"
            index=""
            inputStyle={{
              backgroundColor: "rgba(250, 250, 0, .4)",
              minWidth: "180px",
              maxWidth: "400px",
            }}
          />
        </div>
      ) : (
        ""
      )}{" "}
      {value === questionTypesOptions[0] || value === "Match" ? (
        <div className="other-cont">
          <Input
            id={id + "-other"}
            placeholder="Option's count"
            inputStyle={{
              backgroundColor: "rgba(250, 250, 0, .4)",
              minWidth: "110px",
              maxWidth: "180px",
            }}
            type="QUESTION_TYPE_[1]"
            questionState={questionState}
            questionDispatch={questionDispatch}
            input_type="number"
            index=""
          />
        </div>
      ) : (
        ""
      )}{" "}
    </>
  );
};

export default Select;
