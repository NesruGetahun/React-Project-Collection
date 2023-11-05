import React, { useEffect, useState } from "react";
import Input from "../../../components/Input/Input";
import Button from "../../../components/button/Button";
import styles from "./AutoIncrement.module.css";
const AutoIncrement = ({ containerStyle, autoFillHandler, rowMax, colMax }) => {
  const [autoFillData, setAutoFillData] = useState({
    columnLetter: "A",
    rowStartIndex: 1,
    rowEndIndex: rowMax,
    content: "",
  });

  useEffect(() => {
    setAutoFillData((prev) => {
      return {
        ...prev,
        rowEndIndex: rowMax,
      };
    });
  }, [rowMax]);
  return (
    <div className={styles["increment"]}>
      <div className={styles["cont"]} style={{ ...containerStyle }}>
        <Input
          labelText={"Column Letter"}
          input_cs={styles["input-style"]}
          label_cs={styles["label-style"]}
          onChangeHandler={(event) => {
            setAutoFillData((prev) => {
              const letter = event.target.value?.trim()?.toUpperCase();
              if (letter?.length > 1) return { ...prev };
              return {
                ...prev,
                columnLetter: letter,
              };
            });
          }}
          value={autoFillData.columnLetter}
        />
        <Input
          labelText={"Row Start Index"}
          input_cs={styles["input-style"]}
          label_cs={styles["label-style"]}
          type="number"
          onChangeHandler={(event) => {
            const startIndex = parseInt(event.target.value);
            if (!isNaN(startIndex)) {
              if (startIndex < 1 || startIndex > rowMax) return;
            }

            setAutoFillData((prev) => {
              return {
                ...prev,
                rowStartIndex: isNaN(startIndex) ? 1 : startIndex,
              };
            });
          }}
          value={autoFillData.rowStartIndex}
        />
        <Input
          labelText={"Row End Index"}
          input_cs={styles["input-style"]}
          label_cs={styles["label-style"]}
          type="number"
          onChangeHandler={(event) => {
            const endIndex = parseInt(event.target.value);
            if (!isNaN(endIndex)) {
              if (endIndex < 1 || endIndex > rowMax) return;
            }
            setAutoFillData((prev) => {
              return {
                ...prev,
                rowEndIndex: isNaN(endIndex) ? 1 : endIndex,
              };
            });
          }}
          value={autoFillData.rowEndIndex}
        />

        <Input
          labelText={"Content[Increment]"}
          input_cs={styles["input-style"]}
          label_cs={styles["label-style"]}
          onChangeHandler={(event) => {
            setAutoFillData((prev) => {
              const content = event.target.value;
              return {
                ...prev,
                content: content,
              };
            });
          }}
          value={autoFillData.content}
        />
        <Button
          text={"Fill"}
          className_btn={styles["btn-style"]}
          onClickHandler={() => {
            autoFillHandler({
              ...autoFillData,
            });
          }}
        />
      </div>
    </div>
  );
};

export default AutoIncrement;
