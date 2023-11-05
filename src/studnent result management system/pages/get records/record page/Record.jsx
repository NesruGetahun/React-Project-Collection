import React, { useEffect, useState, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";

import useUserContext from "../../../context/userContex";
import { setTableEntryKeys } from "../../create record/reducer/recordReducer";

import Table from "../../../components/table/Table";
import Input from "../../../components/Input/Input";

import styles from "./Record.module.css";
import PopUp from "../../../components/pop-up/PopUp";

const Record = () => {
  const { id } = useParams();
  const [userState] = useUserContext();
  const [record, setRecord] = useState(undefined);
  const [redirect, setRedirect] = useState("");
  const [scale, setScale] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);

  const serverHandler = useCallback(async (url, method, dataToSend, cb) => {
    try {
      const response = await fetch("http://localhost:4040" + url, {
        method,
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.status === 500) {
        return new Error(result.message);
      }

      cb(result);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const recordDeleteHandler = async () => {
    serverHandler(
      `/record/${id}`,
      "DELETE",
      { userId: userState.id },
      (result) => {
        setRedirect("/get-records");
      }
    );
  };

  const recordEditHandler = () => {
    setRedirect("/create-record?recordId=" + id);
  };
  useEffect(() => {
    serverHandler(
      `/record/${id}`,
      "POST",
      { userId: userState.id },
      (result) => {
        const data = setTableEntryKeys(
          result.rowsCount,
          result.columnsCount,
          result.data
        );

        setRecord({
          ...result,
          data,
          error: {
            status: false,
            type: undefined,
          },
        });
      }
    );
  }, [serverHandler, id, userState]);

  if (redirect !== "") {
    return <Navigate to={redirect} />;
  }
  return (
    <div className={styles["record-page"]}>
      {showOverlay && (
        <div
          className={styles["overlay"]}
          onClick={(event) => {
            setShowOverlay(false);
          }}
        >
          <PopUp
            text={"Are you sure, you want to delete this record ?"}
            onYes={recordDeleteHandler}
            onCancel={(event) => {
              setShowOverlay(false);
            }}
            popStyle={styles["pop-up-style"]}
          />
        </div>
      )}
      {record && (
        <div
          className={styles["container"]}
          style={{ maxHeight: showOverlay ? "85vh" : "" }}
        >
          <div className={styles["btn-container"]}>
            <button
              onClick={(event) => {
                setRedirect("/get-records");
              }}
            >
              🔙
            </button>
            <Input
              type="number"
              step="0.1"
              id="scale-id"
              labelText={`Z : ${scale}`}
              inputStyles={{
                fontSize: "1.2rem",
                maxWidth: "5rem",
                backgroundColor: "white",
              }}
              labelStyle={{
                fontSize: "1rem",
                backgroundColor: "red",
                color: "white",
                padding: "0 .2rem",
              }}
              onChangeHandler={(event) => {
                const number = parseFloat(event.target.value);
                if (isNaN(number) || number > 3 || number <= 0) return;
                setScale(number);
              }}
              value={scale}
            />
            <button onClick={recordEditHandler}>✏️</button>
            <button
              onClick={(event) => {
                setShowOverlay(true);
              }}
            >
              ❌
            </button>
          </div>
          <div
            className={styles["header"]}
            style={{ zoom: scale }}
            dangerouslySetInnerHTML={{ __html: record.header }}
          />
          <Table
            recordState={record}
            editable="false"
            scale={scale}
            containerSyle={{
              padding: "0 3rem 0 1rem",
            }}
          />
          <div
            className={styles["footer"]}
            style={{ zoom: scale }}
            dangerouslySetInnerHTML={{ __html: record.footer }}
          />
        </div>
      )}
    </div>
  );
};

export default Record;
