import React, { useEffect } from "react";

import "./Timer.css";
const Timer = ({ timeLimit, isComplete, setTimeTaken, timer, setTimer }) => {
  useEffect(() => {
    if (timer <= 0 || isComplete) return setTimeTaken(timeLimit * 60 - timer);
    let timeOut = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, [1000]);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isComplete, setTimeTaken, timeLimit, setTimer, timer]);

  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  if (seconds < 10) seconds = "0" + seconds;
  const timer_exp = `${minutes}:${seconds}`;
  return (
    <div
      className="timer"
      style={{ backgroundColor: timer < 10 ? "#fa1c1c" : "#1cff1c" }}
    >
      {timer_exp}
    </div>
  );
};

export default Timer;
