import React, { useRef, useState } from "react";

import "./TimeSetter.css";
const TimeSetter = ({ setTimeLimit }) => {
  const [error, setError] = useState(false);
  const timeLimitRef = useRef(null);
  const submitTimeLimitHandler = () => {
    if (timeLimitRef.current.value === "") {
      return setError(true);
    }
    setTimeLimit(timeLimitRef.current.value);
  };
  return (
    <div className="time-setter">
      <div className="input-cont">
        <input
          type="number"
          id="time-limit"
          placeholder=""
          ref={timeLimitRef}
          min={0}
          style={{
            border: error ? "1.4px solid red" : "",
          }}
        />
        <label htmlFor="time-limit">set time-limit[minutes]</label>
      </div>
      <button onClick={submitTimeLimitHandler}>Start Quiz</button>
    </div>
  );
};

export default TimeSetter;
