import React from "react";
import "./QuestionType.css";
import Textarea from "../textarea/Textarea";
import Input from "../input/Input";
import Button from "../button/Button";
import { LETTERS, questionTypesOptions } from "../../../constant/post-question";
const QuestionType = ({ questionState, questionDispatch }) => {
  const type = questionState.questions.at(-1).questionType;
  const addQuestion = () => {
    questionDispatch({
      type: "ADD_QUESTION",
    });
  };
  let content;
  if (type[0] === questionTypesOptions[0]) {
    content = (
      <MultipleChoice
        options={type[1]}
        questionState={questionState}
        questionDispatch={questionDispatch}
      />
    );
  } else if (type[0] === questionTypesOptions[2]) {
    content = (
      <Textarea
        id="q-answer"
        placeholder="Answer"
        type="QUESTION_ANSWER"
        questionState={questionState}
        questionDispatch={questionDispatch}
        input_type="text"
        labelStyle={{
          color: "rgb(40, 40, 40)",
          fontWeight: "700",
          fontSize: "1.8rem",
          translate: "0% -30%",
        }}
        textareaStyle={{
          width: "100%",
          minWidth: "20rem",
          maxWidth: "100%",
          alignSelf: "start",
          fontSize: "1.6rem",

          fontWeight: "540",
          backgroundColor: "rgba(140, 240, 145, .3)",
          height: "10rem",
          border: "1.2px solid rgba(10, 10, 10, .1)",
          borderRadius: ".3rem",
          boxShadow: "0 0 .3rem rgba(10, 10, 10, .3)",
        }}
      />
    );
  }

  return (
    <div className="main-cont">
      <Textarea
        placeholder="Write your question?"
        id="question"
        type="QUESTION_TEXT"
        questionState={questionState}
        questionDispatch={questionDispatch}
        labelStyle={{
          fontSize: "1.7rem",
          color: "rgb(30, 30, 30)",
        }}
        textareaStyle={{
          backgroundColor: "rgba(120, 200, 120, .1)",
          height: "13rem",
          fontWeight: "540",
          fontSize: "1.8rem",
          border: "1.2px solid rgba(10, 10, 10, .2)",
          boxShadow: "0 0 .3rem rgba(10, 10, 10, .2)",
        }}
      />
      {content}
      <div className="common-section">
        <div className="answer-cont">
          {type[0] !== questionTypesOptions[2] ? (
            <Input
              id="q-answer"
              placeholder="Answer"
              fontSize={"1.4rem"}
              color={"#1c1c1c"}
              type="QUESTION_ANSWER"
              questionState={questionState}
              questionDispatch={questionDispatch}
              input_type="text"
              labelStyle={{
                color: "rgb(40, 40, 40)",
                fontWeight: "800",
                fontSize: "1.8rem",
                translate: "0% -40%",
                // marginLeft: "3rem",
              }}
              inputStyle={{
                // marginLeft: "3rem",
                width: "100%",
                minWidth:
                  type[0] === questionTypesOptions[0] ? "10rem" : "20rem",
                maxWidth:
                  type[0] === questionTypesOptions[0] ? "15rem" : "35rem",
                alignSelf: "start",
                fontSize:
                  type[0] === questionTypesOptions[0] ? "2rem" : "1.5rem",
                fontWeight: type[0] === questionTypesOptions[0] ? "600" : "550",
                backgroundColor: "rgba(140, 240, 145, .3)",
                height: "6rem",
                border: "1.2px solid rgba(10, 10, 10, .1)",
                borderRadius: ".7rem",
                boxShadow: "0 0 .3rem rgba(10, 10, 10, .3)",
              }}
            />
          ) : (
            ""
          )}
        </div>

        <div className="btn-cont">
          <p className="hide"></p>
          <Button
            style={{
              background:
                "linear-gradient(-45deg, rgb(50, 255, 50), rgb(50, 50, 50))",
              color: "rgb(250, 250, 250)",
              padding: ".2rem 1.3rem",
              fontWeight: "800",
              fontSize: "3rem",
              borderRadius: "4rem",
              boxShadow: "0 0 .3rem rgba(10, 10, 10, .1)",
            }}
            title={"+"}
            onClick={addQuestion}
          />
        </div>
      </div>
    </div>
  );
};

const MultipleChoice = ({ options, questionState, questionDispatch }) => {
  const counts = [];

  for (let i = 0; i < options; i++) {
    counts.push(i);
  }
  return (
    <div className="multiple-choice">
      <div className="options">
        {counts.map((count) => {
          return (
            <Textarea
              key={LETTERS[count]}
              id="q-option"
              placeholder={LETTERS[count] + ")"}
              type="QUESTION_OPTION"
              questionState={questionState}
              questionDispatch={questionDispatch}
              input_type="text"
              index={count}
              labelStyle={{
                color: "black",
                fontWeight: "800",
                fontSize: "2rem",
                translate: "-50% 30%",
              }}
              textareaStyle={{
                fontWeight: "540",
                fontSize: "1.6rem",
                marginLeft: "3rem",
                backgroundColor: "rgba(10, 10, 10, .04)",
                height: "6rem",
                border: "1.2px solid rgba(10, 10, 10, .1)",
                borderRadius: ".7rem",
                boxShadow: "0 0 .3rem rgba(10, 10, 10, .2)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionType;
