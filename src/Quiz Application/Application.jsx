import React, { useState } from "react";
import TimeSetter from "./components/time setter/TimeSetter";
import QuizDisplay from "./components/quiz display/QuizDisplay";

const Application = () => {
  const [timeLimit, setTimeLimit] = useState(undefined);

  return <div>
    {!timeLimit && <TimeSetter setTimeLimit={setTimeLimit} />}
    {timeLimit && <QuizDisplay timeLimit={timeLimit} />}
  </div>;
};

export default Application;
