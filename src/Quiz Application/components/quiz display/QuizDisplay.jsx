import React, { useState } from "react";

import "./QuizDisplay.css";
import QUESTIONS from "../../constants/data/questions";
import Timer from "../timer/Timer";
import ShowScore from "../show score/ShowScore";
const LETTERS = "ABCDEFGHIJK";
const QuizDisplay = ({ timeLimit }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(timeLimit * 60);
  const [answerArray, setAnswerArray] = useState(
    new Array(QUESTIONS.length).fill(undefined)
  );
  const [timeTaken, setTimeTaken] = useState(0);
  const restartQuiz = () => {
    setAnswerArray(new Array(QUESTIONS.length).fill(undefined));
    setQuestionIndex(0);
    setTimeTaken(0);
    setTimer(timeLimit * 60);
  };
  let showIndex = questionIndex;
  let isComplete = true;
  answerArray.forEach((response, i) => {
    if (!response?.choise) isComplete = false;
  });
  return (
    <div className="quiz-display">
      <Timer
        timeLimit={timeLimit}
        isComplete={isComplete}
        setTimeTaken={setTimeTaken}
        timer={timer}
        setTimer={setTimer}
      />
      <div className="sq--nos">
        <div className="quiz-cont">
          {QUESTIONS.map((question, index) => {
            return (
              <div
                className="question"
                key={question.id}
                style={{
                  transform: `translateX(${
                    showIndex++ * 100
                  }%) skewY(${showIndex - 1 === 0 ? "0deg" : "45deg"})`,
                  opacity: showIndex - 1 === 0 ? "1" : "0",
                }}
              >
                <Choise
                  questionIndex={questionIndex}
                  setQuestionIndex={setQuestionIndex}
                  question={question}
                  index={index}
                  answerArray={answerArray}
                  setAnswerArray={setAnswerArray}
                />
              </div>
            );
          })}
        </div>

        <div className="q-nos">
          {QUESTIONS.map((question, index) => {
            let bgStyle = undefined;
            if (answerArray[index]?.isCorrect === true) {
              bgStyle = { backgroundColor: "#1cff1c" };
            } else if (answerArray[index]?.isCorrect === false) {
              bgStyle = { backgroundColor: "#ff1c1c" };
            }

            return (
              <div
                style={{
                  border:
                    Math.abs(questionIndex) === index
                      ? "1.4px dashed #777777"
                      : "",
                  backgroundColor: bgStyle?.backgroundColor,
                }}
                className="q-no"
                key={question.id}
                onClick={(e) => {
                  setQuestionIndex(-index);
                }}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>

      <ShowScore
        answerArray={answerArray}
        timeTaken={timeTaken}
        restartQuiz={restartQuiz}
      />
    </div>
  );
};

const Choise = ({
  question,
  index,
  answerArray,
  setAnswerArray,
  questionIndex,
  setQuestionIndex,
}) => {
  const { question_text, question_answer, options } = question;
  let timeOut = undefined;
  return (
    <div className="choise">
      <h2>{question_text}</h2>
      <ol type="A">
        {options.map((option, i) => {
          let styleObject = undefined;
          if (LETTERS[i] === answerArray[index]?.answer) {
            styleObject = { backgroundColor: "#1cff1c" };
          } else if (LETTERS[i] === answerArray[index]?.choise) {
            styleObject = { backgroundColor: "#ff1c1c" };
          }
          return (
            <li
              key={option + i}
              data-letter={LETTERS[i]}
              style={styleObject}
              onClick={(ev) => {
                if (answerArray.at(index)?.choise) return;
                clearTimeout(timeOut);
                timeOut = setTimeout(() => {
                  if (Math.abs(questionIndex) === answerArray.length - 1)
                    setQuestionIndex(0);
                  else setQuestionIndex((prev) => prev - 1);
                }, 500);
                const choise = ev.target.dataset["letter"];
                let response = {
                  choise,
                  answer: question_answer,
                  isCorrect: choise === question_answer,
                };

                setAnswerArray((prev) => {
                  const updatedAnswerArray = [...prev];
                  updatedAnswerArray[index] = response;
                  return updatedAnswerArray;
                });
              }}
            >
              {option}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuizDisplay;
