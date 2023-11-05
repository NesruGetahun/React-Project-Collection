import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer,
  useCallback,
} from "react";
import { Navigate, useLocation } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import ContentEditor from "../../components/content editor/ContentEditor";

import RECORD_ACTIONS, {
  recordInit,
  recordReducer,
} from "./reducer/recordReducer";
import useUserContext from "../../context/userContex";
import { setTableEntryKeys } from "./reducer/recordReducer";

import styles from "./CreateRecord.module.css";
import AutoIncrement from "./auto fill/AutoIncrement";
import AutoCompute from "./auto fill/AutoCompute";

const CreateRecord = () => {
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInit);
  const [scale, setScale] = useState(1);
  const [redirect, setRedirect] = useState("");
  const [autoFill, setAutoFill] = useState({
    show: false,
  });
  const [showCompute, setShowCompute] = useState({
    show: false,
    error: {
      status: false,
      message: "",
    },
  });
  const [selectedRow_Column, setSelectedRow_Column] = useState([]);
  const [userState] = useUserContext();
  const tableRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const location = useLocation();
  const recordId = useMemo(() => location.search.split("=")[1], [location]);

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

  const getTableData = () => {
    let rowCount = 0;
    const ENTITIES = [];
    const rows = Array.from(tableRef.current?.children[0].children || []);
    if (rows?.length > 0) {
      for (let row of rows) {
        let rowEntites = Array.from(row.children);
        // REMOVING SPAN FROM BEING READ
        rowEntites.splice(0, 1);
        ENTITIES[rowCount] = [];
        rowCount++;
        for (let entity of rowEntites) {
          ENTITIES[rowCount - 1].push(entity.lastChild.textContent);
        }
      }
    }

    return ENTITIES;
  };
  const submitHandler = (event) => {
    event.preventDefault();

    recordDispatch({
      type: RECORD_ACTIONS.SET_DATA,
      payload: getTableData(),
    });
  };

  const onSave = () => {
    const dataToSave = {
      data: getTableData(),
      header: headerRef.current.innerHTML,
      footer: footerRef.current.innerHTML,
    };

    if (dataToSave.data.length < 1)
      return recordDispatch({
        type: RECORD_ACTIONS.SET_RECORD_ERROR,
      });

    if (
      recordState.rows !== recordState.data.length ||
      recordState.cols !== recordState.data[0].rowData.length
    )
      return;

    recordDispatch({
      type: RECORD_ACTIONS.SAVE_DATA,
      payload: {
        ...dataToSave,
      },
    });

    if (recordState.isUpdate) {
      serverHandler(
        `/record/${recordId}`,
        "PATCH",
        {
          userId: userState.id,
          rows: recordState.rows,
          cols: recordState.cols,
          ...dataToSave,
        },
        () => {
          setRedirect(`/get-records/record/${recordId}`);
        }
      );
    } else {
      serverHandler(
        "/record",
        "POST",
        {
          userId: userState.id,
          rows: recordState.rows,
          cols: recordState.cols,
          ...dataToSave,
        },
        () => {
          setRedirect(`/get-records`);
          // get-records
        }
      );
    }
  };

  const onDeleteRows = () => {
    if (selectedRow_Column.filter((item) => item.row === true).length <= 0)
      return;
    recordDispatch({
      type: RECORD_ACTIONS.DELETE_ROWS,
      payload: {
        selectedItems: selectedRow_Column,
        contentData: getTableData(),
      },
    });

    setSelectedRow_Column((prev) => {
      return prev.filter((item) => item.row !== true);
    });
  };

  const onDeleteColumns = () => {
    if (selectedRow_Column.filter((item) => item.column === true).length <= 0)
      return;
    recordDispatch({
      type: RECORD_ACTIONS.SET_DATA,
      payload: getTableData(),
    });

    // then
    recordDispatch({
      type: RECORD_ACTIONS.DELETE_COLUMNS,
      payload: {
        selectedItems: selectedRow_Column,
        contentData: getTableData(),
      },
    });

    setSelectedRow_Column((prev) => {
      return prev.filter((item) => item.column !== true);
    });
  };

  const selectRow = (key) => {
    const row = selectedRow_Column.findIndex(
      (item) => item.key === key && item.row === true
    );
    if (row === -1) {
      setSelectedRow_Column((prev) => [
        ...prev,
        {
          key: key,
          row: true,
        },
      ]);
    } else {
      setSelectedRow_Column((prev) => {
        return prev.filter((item) => item.key !== key && row !== false);
      });
    }
  };

  const selectColumn = (key) => {
    const column = selectedRow_Column.findIndex(
      (item) => item.key === key && item.column === true
    );
    if (column === -1) {
      setSelectedRow_Column((prev) => [
        ...prev,
        {
          key: key,
          column: true,
        },
      ]);
    } else {
      setSelectedRow_Column((prev) => {
        return prev.filter((item) => item.key !== key && column !== false);
      });
    }
  };

  const autoFillHandler = (data) => {
    const letterRegEx = /\D/;
    if (!letterRegEx.test(data.columnLetter)) return;
    recordDispatch({
      type: RECORD_ACTIONS.AUTO_FILL,
      payload: {
        fillData: data,
        tableData: getTableData(),
      },
    });
    // setAutoFill((prev) => {
    //   return {
    //     show: false,
    //   };
    // });
  };

  const autoComputeHandler = (computeData) => {
    // validation
    const tableData = getTableData();
    if (tableData.length < 1) return;

    recordDispatch({
      type: RECORD_ACTIONS.AUTO_COMPUTE,
      payload: {
        computeData,
        tableData,
      },
    });

    // setShowCompute({
    //   show: false,
    //   error: {
    //     status: false,
    //     message: "",
    //   },
    // });
  };

  useEffect(() => {
    if (recordId) {
      serverHandler(
        `/record/${recordId}`,
        "POST",
        { userId: userState.id },
        (result) => {
          const record = { ...recordInit };
          const data = setTableEntryKeys(
            result.rowsCount,
            result.columnsCount,
            result.data
          );
          record.data = data;
          record.rows = result.rowsCount;
          record.cols = result.columnsCount;
          record.header = result.header;
          record.footer = result.footer;

          recordDispatch({
            type: RECORD_ACTIONS.UPDATE_RECORD,
            payload: {
              record,
            },
          });
        }
      );
    }
  }, [recordId, userState, serverHandler]);

  if (redirect !== "") {
    return <Navigate to={redirect} />;
  }

  // recordState.data.forEach((row) => {
  //   log(...row.rowData);
  // });
  return (
    <div className={styles["create-record"]}>
      <div className={styles["control-section"]}>
        <form onSubmit={submitHandler}>
          <Input
            type="number"
            labelText="Rows"
            id="input-row-id"
            inputStyles={{
              fontSize: "1.25rem",
            }}
            labelStyle={{ fontSize: "1.2rem" }}
            value={recordState.rows}
            onChangeHandler={(event) => {
              const number = parseInt(event.target.value);
              if (number < 1) return;
              recordDispatch({
                type: RECORD_ACTIONS.SET_ROWS,
                payload: number,
              });
            }}
          />
          <Input
            type="number"
            labelText="Cols"
            inputStyles={{
              fontSize: "1.25rem",
            }}
            labelStyle={{ fontSize: "1.2rem" }}
            id="input-col-id"
            value={recordState.cols}
            onChangeHandler={(event) => {
              const number = parseInt(event.target.value);
              if (number < 1 || number > 26) return;
              recordDispatch({
                type: RECORD_ACTIONS.SET_COLS,
                payload: number,
              });
            }}
          />

          <Button
            text="🔃"
            className_btn={styles["btn-style"]}
            containerStyle={{ width: "fit-content" }}
          />
        </form>

        <div className={styles["other-controls"]}>
          <div className={styles["btn-cont"]}>
            <p onClick={onDeleteColumns}>❌: Columns</p>
            <p onClick={onDeleteRows}>❌: Rows</p>
          </div>

          <div className={styles["btn-cont"]}>
            <p
              onClick={() => {
                setShowCompute((prev) => {
                  return {
                    ...prev,
                    show: false,
                  };
                });
                setAutoFill((prev) => {
                  return {
                    show: !prev.show,
                  };
                });
              }}
            >
              🏧: Auto Increment
            </p>
            <p
              onClick={(event) => {
                setAutoFill((prev) => {
                  return {
                    show: false,
                  };
                });
                setShowCompute((prev) => {
                  return {
                    ...prev,
                    show: !prev.show,
                  };
                });
              }}
            >
              🧮: Query
            </p>
          </div>
          <Input
            type="number"
            step="0.1"
            id="scale-id"
            labelText={`Z: ${scale}`}
            inputStyles={{
              fontSize: "1.25rem",
              maxWidth: "5rem",
            }}
            labelStyle={{
              fontSize: "1.2rem",
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
          <Button
            text="🗃️"
            className_btn={styles["btn-style"]}
            containerStyle={{ width: "fit-content" }}
            onClickHandler={(event) => {
              onSave();
            }}
          />
        </div>
      </div>
      <div className={styles["overlay"]}>
        <AutoIncrement
          containerStyle={{
            opacity: autoFill.show ? "1" : "0",
            height: autoFill.show ? "26rem" : "0",
            zIndex: autoFill.show ? "999" : "0",
          }}
          autoFillHandler={autoFillHandler}
          rowMax={recordState.rows}
          colMax={recordState.cols}
        />
        <AutoCompute
          containerStyle={{
            opacity: showCompute.show ? "1" : "0",
            height: showCompute.show ? "26rem" : "0",
            zIndex: showCompute.show ? "999" : "0",
          }}
          showCompute={showCompute}
          rowMax={recordState.rows}
          colMax={recordState.cols}
          autoComputeHandler={autoComputeHandler}
        />
      </div>
      <div className={styles["records-section"]}>
        <ContentEditor
          editorRef={headerRef}
          scale={scale}
          editorStyles={{
            height: "6.4rem",
            marginTop: ".2em",
            fontSize: "1.7rem",
          }}
          placeholder={
            recordState.header === "" ? "Table Header..." : recordState.header
          }
        />
        <Table
          selectedRow_Column={selectedRow_Column}
          recordState={recordState}
          scale={scale}
          tableRef={tableRef}
          selectColumn={selectColumn}
          selectRow={selectRow}
          forShow={false}

          // tableStyle={{ marginTop: "1rem" }}
        />
        <ContentEditor
          editorRef={footerRef}
          scale={scale}
          editorStyles={{
            height: "6.4rem",
            fontSize: "1.5rem",
          }}
          placeholder={
            recordState.footer === "" ? "Table Footer..." : recordState.footer
          }
        />
      </div>
    </div>
  );
};

export default CreateRecord;
