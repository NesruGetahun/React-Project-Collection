import React, { useReducer, useState } from "react";

import "./PostQuestions.css";
import Input from "../../components/input/Input";
import Textarea from "../../components/textarea/Textarea";
import Select from "../../components/select/Select";
import Button from "../../components/button/Button";
import QuestionType from "../../components/question types/QuestionType";

import {
  difficalityLevelOptions,
  subjectOptions,
  LETTERS,
  educationLevelOptions,
  questionTypesOptions,
} from "../../../constant/post-question";
class Question {
  
}
const questionInit = {
  educationLevelCatagory: [educationLevelOptions[0], ""],
  subjectCatagory: [subjectOptions[0], ""],
  questionDifficalityCatagory: difficalityLevelOptions[0],
  generalTitle: "",
  shortDescription: "",
  longDescription: "",
  questions: [
    {
      questionType: [questionTypesOptions[0], 2],
    },
  ],
};

const questionReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "GRADE_CATAGORY":
      return {
        ...state,
        educationLevelCatagory: [...action.payload],
      };
    case "GRADE_CATAGORY_[1]":
      return {
        ...state,
        educationLevelCatagory: [
          state.educationLevelCatagory[0],
          action.payload,
        ],
      };
    case "SUBJECT_CATAGORY":
      return {
        ...state,
        subjectCatagory: [...action.payload],
      };
    case "SUBJECT_CATAGORY_[1]":
      return {
        ...state,
        subjectCatagory: [state.subjectCatagory[0], action.payload],
      };
    case "DIFFICALITY_CATAGORY":
      return {
        ...state,
        questionDifficalityCatagory: action.payload,
      };

    case "GENERAL_TITLE":
      return {
        ...state,
        generalTitle: action.payload,
      };
    case "SHORT_DESCRIPTION":
      return {
        ...state,
        shortDescription: action.payload,
      };
    case "LONG_DESCRIPTION":
      return {
        ...state,
        longDescription: action.payload,
      };
    case "QUESTION_TYPE": {
      const updatedQuestions = [...state.questions];

      updatedQuestions[updatedQuestions.length - 1].questionType = [
        ...action.payload,
      ];


      if (action.payload[0] === questionTypesOptions[0]) {
        if (
          updatedQuestions[updatedQuestions.length - 1]?.questionAnswer !==
            undefined &&
          updatedQuestions[updatedQuestions.length - 1]?.questionAnswer !== ""
        )
          updatedQuestions[updatedQuestions.length - 1].questionAnswer = "";
      } else if (action.payload[0] !== questionTypesOptions[1]) {
        updatedQuestions[updatedQuestions.length - 1].questionType[1] = 0;
        updatedQuestions[updatedQuestions.length - 1].options = [];
      }
      return {
        ...state,
        questions: [...updatedQuestions],
      };
    }
    case "QUESTION_TYPE_[1]": {
      const updatedQuestions = [...state.questions];
      if (action.payload < 2 || action.payload > 8) return { ...state };

      updatedQuestions.at(-1).questionType = [
        updatedQuestions.at(-1).questionType[0],
        action.payload,
      ];

      return {
        ...state,
        questions: [...updatedQuestions],
      };
    }

    case "QUESTION_TEXT": {
      let updatedQuestions = [...state.questions];
      updatedQuestions = updatedQuestions.map((question, index) => {
        if (index === updatedQuestions.length - 1) {
          return {
            ...question,
            questionText: action.payload,
          };
        }
        return {
          ...question,
        };
      });

      return {
        ...state,
        questions: [...updatedQuestions],
      };
    }
    case "QUESTION_OPTION": {
      let updatedQuestions = [...state.questions];
      const getOptions = () => {
        let options = [];
        if (state.questions.at(-1)?.options?.length > 0)
          options = [...state.questions.at(-1).options];

        options[action.payload.index] = action.payload.value;
        return options;
      };

      updatedQuestions = updatedQuestions.map((question, index) => {
        if (index === updatedQuestions.length - 1) {
          return {
            ...question,
            options: getOptions(),
          };
        }
        return {
          ...question,
        };
      });

      return {
        ...state,
        questions: [...updatedQuestions],
      };
    }
    case "QUESTION_ANSWER": {
      let updatedQuestions = [...state.questions];
      if (updatedQuestions.at(-1).questionType[1] > 1) {
        let options = [];
        let count = updatedQuestions.at(-1).questionType[1];
        for (let i = 0; i < count; i++) {
          options.push(updatedQuestions.at(-1).options[i]);
        }

        updatedQuestions[updatedQuestions.length - 1].options = [...options];
      }
      const possibleValues = LETTERS + LETTERS.toLowerCase();
      updatedQuestions = updatedQuestions.map((question, index) => {
        if (
          index === updatedQuestions.length - 1 &&
          updatedQuestions.at(-1).questionType[0] === questionTypesOptions[0]
        ) {
          if (!possibleValues.includes(action.payload)) return { ...question };

          return {
            ...question,
            questionAnswer: action.payload.toUpperCase()[0],
          };
        } else if (
          index === updatedQuestions.length - 1 &&
          updatedQuestions.at(-1).questionType[0] !== questionTypesOptions[0]
        ) {
          return {
            ...question,
            questionAnswer: action.payload,
          };
        }
        return {
          ...question,
        };
      });

      return {
        ...state,
        questions: [...updatedQuestions],
      };
    }
    case "ADD_QUESTION": {
      let updatedQuestions = [...state.questions];
      const isOptionsValid = () => {
        const questionCount = updatedQuestions.at(-1)?.options?.length;
        if (questionCount === undefined || questionCount === 0) return false;
        else {
          let validOption = true;
          updatedQuestions.at(-1)?.options?.forEach((option) => {
            if (option === "" || option === undefined) validOption = false;
          });

          return validOption;
        }
      };

      if (
        updatedQuestions.at(-1).questionText === undefined ||
        updatedQuestions.at(-1).questionText === "" ||
        updatedQuestions.at(-1).questionAnswer === undefined ||
        updatedQuestions.at(-1).questionAnswer === "" ||
        !isOptionsValid()
      ) {
        return { ...state };
      }
      const lastPart = { ...state.questions.at(-1) };
      lastPart.questionText = "";
      lastPart.questionAnswer = "";
      updatedQuestions = [...updatedQuestions, { ...lastPart }];

      return {
        ...state,
        questions: [...updatedQuestions],
      };
    }
    default:
      return {
        ...questionInit,
      };
  }
};
const PostQuestions = () => {
  const [questionState, questionDispatch] = useReducer(
    questionReducer,
    questionInit
  );
  const [showSectionIndex, setShowSectionIndex] = useState(0);
  const goToNext = () => {
    setShowSectionIndex((prev) => prev - 1);
  };
  const goToPrevious = () => {
    setShowSectionIndex((prev) => prev + 1);
  };
  const getTranslate = (index) => {
    return {
      translate: index * 100 + "% 0",
    };
  };

  let index = showSectionIndex;
  console.log(...questionState.questions);
  return (
    <div className="post-questions">
      <div className="add-question">
        <div className="sections first-section" style={getTranslate(index++)}>
          <Select
            id="q-grade-catagory"
            placeholder="Education level Catagory"
            options={educationLevelOptions}
            type="GRADE_CATAGORY"
            questionState={questionState}
            questionDispatch={questionDispatch}
          />
          <Select
            id="q-subject-catagory"
            placeholder="Subject catagory"
            options={subjectOptions}
            type="SUBJECT_CATAGORY"
            questionState={questionState}
            questionDispatch={questionDispatch}
          />
          <Select
            id="q-difficality-catagory"
            placeholder="Questions difficality level"
            options={difficalityLevelOptions}
            type="DIFFICALITY_CATAGORY"
            questionState={questionState}
            questionDispatch={questionDispatch}
          />

          <Input
            id="q-title"
            placeholder="General title for questions"
            type="GENERAL_TITLE"
            questionState={questionState}
            questionDispatch={questionDispatch}
            input_type="text"
            index=""
            inputStyle={{
              fontSize: "2rem",
              color: "#ba1c1c",
            }}
          />
          <Textarea
            placeholder="Short description for questions"
            textareaStyle={{
              height: "15rem",
              fontSize: "1.5rem",
            }}
            id="q-short-desc"
            type="SHORT_DESCRIPTION"
            questionState={questionState}
            questionDispatch={questionDispatch}
          />
          <Textarea
            placeholder="Long description for questions"
            textareaStyle={{
              height: "25rem",
              fontSize: "1.5rem",
            }}
            id="q-long-desc"
            type="LONG_DESCRIPTION"
            questionState={questionState}
            questionDispatch={questionDispatch}
          />
          <Button title={">"} onClick={goToNext} />
        </div>
        <div className="sections second-section" style={getTranslate(index++)}>
          <Select
            id="q-question-type"
            placeholder="Question Types"
            options={questionTypesOptions}
            type="QUESTION_TYPE"
            questionState={questionState}
            questionDispatch={questionDispatch}
            dropStyle={{ height: "11.2rem" }}
          />
          <QuestionType
            questionState={questionState}
            questionDispatch={questionDispatch}
          />
          <div className="btn-cont">
            <Button title="<" onClick={goToPrevious} />
            <Button title={">"} onClick={goToNext} />
          </div>
        </div>

        <div className="sections thrid-section" style={getTranslate(index++)}>
          <div className="btn-cont">
            <Button title="Submit Questions" onClick={goToPrevious} />
          </div>
        </div>
      </div>
      <div className="show-questions">
        <h1>Question Information</h1>
        <ul>
          <li>
            <span className="meta">Education Level</span>
            <span className="data">
              {questionState.educationLevelCatagory[0]}
            </span>
          </li>
          {questionState.educationLevelCatagory[0] ===
            "University 2nd degree" ||
          questionState.educationLevelCatagory[0] ===
            "University 1st degree" ? (
            <li>
              <span className="meta">Department's Name</span>
              <span className="data">
                {questionState.educationLevelCatagory[1]}
              </span>
            </li>
          ) : (
            ""
          )}

          <li>
            <span className="meta">Subject</span>
            <span className="data">{questionState.subjectCatagory[0]}</span>
          </li>
          {questionState.subjectCatagory[0] === subjectOptions.at(-1) ? (
            <li>
              <span className="meta">Subject's Name</span>
              <span className="data">{questionState.subjectCatagory[1]}</span>
            </li>
          ) : (
            ""
          )}
          <li>
            <span className="meta">Difficality Level</span>
            <span className="data">
              {questionState.questionDifficalityCatagory}
            </span>
          </li>
          <li>
            <span className="meta">General Title</span>
            <span className="data">{questionState.generalTitle}</span>
          </li>
          <li>
            <span className="meta">Short Description</span>
            <span className="data">{questionState.shortDescription}</span>
          </li>
          <li>
            <span className="meta">Long Description</span>
            <span className="data">{questionState.longDescription}</span>
          </li>
        </ul>
        <div className="questions">
          <h2>Questions</h2>
          {questionState.questions.map((question, count) => {
            return (
              <div className="question" key={count}>
                <p>
                  <span className="q-count">{count + 1}</span>
                  <span className="q-text">{question.questionText}</span>
                </p>
                <ul>
                  {question.options?.map((option, index) => {
                    if (
                      question.questionAnswer === "" ||
                      question.questionAnswer === undefined ||
                      question.questionType[1] < 1
                    ) {
                      return "";
                    }
                    return (
                      <li key={index}>
                        <span className="option-letter">
                          {LETTERS[index]}
                          {")"}
                        </span>
                        <span className="option-value">{option}</span>
                      </li>
                    );
                  })}
                </ul>
                {question.questionAnswer ? (
                  <p className="answer">
                    <span>Answer</span>
                    <span
                      style={{
                        fontWeight:
                          question.questionType[0] === questionTypesOptions[0]
                            ? "700"
                            : "500",
                      }}
                    >
                      {question.questionAnswer}
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostQuestions;
