import React, { useEffect, useState } from "react";

import "./ShowScore.css";
const ShowScore = ({ answerArray, timeTaken, restartQuiz }) => {
  const restartHandler = () => {
    restartQuiz();
  };
  const correctAnswers = answerArray.reduce((sum, p) => {
    if (p?.isCorrect) return sum + 1;
    else return sum;
  }, 0);

  const wrongAnswers = answerArray.length - correctAnswers;
  let minutes = Math.floor(timeTaken / 60);
  let seconds = timeTaken % 60;
  if (seconds < 10) seconds = "0" + seconds;
  const timer_exp = `${minutes}:${seconds}`;
  const [showScore, setShowScore] = useState(timeTaken > 0);
  useEffect(() => {
    setShowScore(timeTaken > 0);
  }, [timeTaken]);
  return (
    <div className="show-score">
      {showScore && (
        <div className="score-cont">
          <h1>Score</h1>
          <table>
            <tbody>
              <tr>
                <td>Total questions</td>
                <td>{answerArray.length}</td>
              </tr>
              <tr>
                <td>⏲️</td>
                <td>{timer_exp}</td>
              </tr>

              <tr>
                <td>✅</td>
                <td>{correctAnswers}</td>
              </tr>
              <tr>
                <td>❌</td>
                <td>{wrongAnswers}</td>
              </tr>
              <tr>
                <td>🫵</td>
                <td>
                  {(correctAnswers / answerArray.length).toFixed(2) * 100}%
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn--restart" onClick={restartHandler}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowScore;
