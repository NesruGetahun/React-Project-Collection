import React from "react";
import styles from "./Table.module.css";
import RECORD_ACTIONS from "../../pages/create record/reducer/recordReducer";
const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const Table = ({
  tableStyle,
  recordState,
  scale,
  tableRef,
  editable = "true",
  selectedRow_Column,
  selectRow,
  selectColumn,
  forShow = true,
  containerSyle,
}) => {
  let rowIndex = 1;
  let columnIndex = 0;

  return (
    <div
      className={styles["table-container"]}
      style={{
        border:
          recordState.error?.status &&
          recordState.error?.type === RECORD_ACTIONS.SET_RECORD_ERROR
            ? "1.4px solid rgba(200, 40, 40, 0.7)"
            : "",
        ...tableStyle,
        ...containerSyle,
      }}
    >
      <table
        ref={tableRef}
        style={{
          zoom: scale,
        }}
      >
        <tbody>
          {recordState.data?.map((row) => {
            return (
              <tr key={row.key}>
                {!forShow && (
                  <span
                    className={styles["delete-row-btn"]}
                    onClick={(event) => {
                      selectRow(row.key);
                    }}
                    style={{
                      backgroundColor:
                        selectedRow_Column.findIndex(
                          (item) => item.key === row.key && item.row
                        ) !== -1
                          ? "rgba(180, 180, 180, 1)"
                          : "",
                    }}
                  >
                    {rowIndex++}
                  </span>
                )}
                {row.rowData.map((entry) => {
                  return (
                    <td key={entry.key}>
                      {!forShow && rowIndex - 1 === 1 && (
                        <span
                          className={styles["delete-col-btn"]}
                          onClick={(event) => {
                            selectColumn(entry.key);
                          }}
                          style={{
                            backgroundColor:
                              selectedRow_Column.findIndex(
                                (item) => item.key === entry.key && item.column
                              ) !== -1
                                ? "rgba(180, 180, 180, 1)"
                                : "",
                          }}
                        >
                          {LETTERS[columnIndex++]}
                        </span>
                      )}

                      <span
                        className={styles["row-content"]}
                        contentEditable={editable}
                        spellCheck="false"
                        style={{}}
                      >
                        {entry.entry}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
