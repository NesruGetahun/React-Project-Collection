import React, { useEffect, useState } from "react";

import styles from "./AutoCompute.module.css";
import Input from "../../../components/Input/Input";
import Button from "../../../components/button/Button";
const AutoCompute = ({
  containerStyle,
  rowMax,
  autoComputeHandler,
  showCompute,
}) => {
  const [autoComputeData, setAutoComputeData] = useState({
    operation: "+",
    rowStartIndex: 1,
    rowEndIndex: 5,
    query: "A + B = C",
  });
  useEffect(() => {
    setAutoComputeData((prev) => {
      return {
        ...prev,
        rowEndIndex: rowMax,
      };
    });
  }, [rowMax]);

  return (
    <div className={styles["auto-compute"]}>
      <div className={styles["cont"]} style={{ ...containerStyle }}>
        <select
          onChange={(event) => {
            const choice = event.target.value;
            setAutoComputeData((prev) => {
              return {
                ...prev,
                operation: choice,
              };
            });
          }}
          value={autoComputeData.operation}
        >
          <option value="+">Addition</option>
          <option value="-">Subtraction</option>
          <option value="*">Multiplication</option>
          <option value="/">Division</option>
          <option value="avg">Average</option>
        </select>

        <Input
          id={"auto-compute-start-index-id"}
          labelText={"Row Start Index"}
          input_cs={styles["input"]}
          label_cs={styles["label"]}
          type="number"
          onChangeHandler={(event) => {
            const startIndex = parseInt(event.target.value);
            if (!isNaN(startIndex)) {
              if (startIndex < 1) return;
            }

            setAutoComputeData((prev) => {
              return {
                ...prev,
                rowStartIndex: isNaN(startIndex) ? 1 : startIndex,
              };
            });
          }}
          value={autoComputeData.rowStartIndex}
        />
        <Input
          id={"auto-compute-end-index-id"}
          labelText={"Row End Index"}
          input_cs={styles["input"]}
          label_cs={styles["label"]}
          type="number"
          value={autoComputeData.rowEndIndex}
          onChangeHandler={(event) => {
            const endIndex = parseInt(event.target.value);
            if (!isNaN(endIndex)) {
              if (endIndex < 1) return;
            }

            setAutoComputeData((prev) => {
              return {
                ...prev,
                rowEndIndex: isNaN(endIndex) ? 1 : endIndex,
              };
            });
          }}
        />
        <Input
          labelText={showCompute.error.status ? "Invalid Syntax" : "Query"}
          id={"query-id"}
          input_cs={`${styles["input"]} ${styles["query"]}`}
          label_cs={styles["label"]}
          inputStyles={{
            backgroundColor: showCompute.error.status
              ? "rgba(200, 20, 20, .2)"
              : "",
          }}
          value={autoComputeData.query}
          onChangeHandler={(event) => {
            let query = event.target.value?.toUpperCase();

            setAutoComputeData((prev) => {
              return {
                ...prev,
                query,
              };
            });
          }}
        />

        <Button
          text={"Compute"}
          className_btn={styles["btn"]}
          onClickHandler={(event) => {
            autoComputeHandler(autoComputeData);
          }}
        />
      </div>
    </div>
  );
};

export default AutoCompute;
