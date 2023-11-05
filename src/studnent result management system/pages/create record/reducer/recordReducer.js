const RECORD_ACTIONS = {
  SET_ROWS: "01",
  SET_COLS: "02",
  SET_DATA: "03",
  SAVE_DATA: "04",
  SET_RECORD_ERROR: "05",
  UPDATE_RECORD: "06",
  DELETE_ROWS: "07",
  DELETE_COLUMNS: "08",
  AUTO_FILL: "09",
  AUTO_COMPUTE: "10",
};

export default RECORD_ACTIONS;
export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const setTableEntryKeys = (rows, cols, payload) => {
  const twoD = [];
  for (let i = 0; i < rows; i++) {
    twoD.push({ key: "key-" + i, rowData: [] });
    for (let j = 0; j < cols; j++) {
      twoD[i].rowData.push({
        key: "key-" + i + "-" + j,
        entry: "",
      });

      // for setting numbers for table first column
      if (i === 0 && j === 0) {
        twoD[0].rowData[0].entry = "";
      } else if (j === 0 && i > 0) {
        twoD[i].rowData[0].entry = "";
      }
    }
  }

  if (payload.length > 0) {
    for (let i = 0; i < payload.length; i++) {
      for (let j = 0; j < payload[0].length; j++) {
        if (twoD[i]?.rowData?.at(j)) twoD[i].rowData[j].entry = payload[i][j];
        continue;
      }
    }
  }

  return twoD;
};

const getLetterIndex = (letter) => {
  const index = LETTERS.split("").findIndex((LETTER) => LETTER === letter);

  return index;
};

const getASMD_data = (
  operation,
  rowStartIndex,
  rowEndIndex,
  query,
  tableData
) => {
  const [operands, resultant] = query.split("=").map((side) => side.trim());
  const operandsColumnIndex = operands
    .split(operation)
    .map((letter) => letter.trim())
    .map((letter) => getLetterIndex(letter));
  const resultantIndex = getLetterIndex(resultant);

  let updatedData = [];
  for (let i = 0; i < tableData.length; i++) {
    updatedData[i] = [];
    let result = "";
    for (let j = 0; j < tableData[0].length; j++) {
      if (i >= rowStartIndex - 1 && i <= rowEndIndex - 1) {
        if (resultantIndex === j) {
          result = result.split("").slice(0, -1).join("");
          // eslint-disable-next-line no-eval
          const resultant = eval(result);

          updatedData[i].push(resultant);
          continue;
        } else if (operandsColumnIndex.includes(j)) {
          result += tableData[i][j] + operation;
        }
      }

      updatedData[i].push(tableData[i][j]);
    }
  }

  return updatedData;
};

const getAverage = (
  operation,
  rowStartIndex,
  rowEndIndex,
  query,
  tableData
) => {
  const [operands, resultant] = query.split("=").map((side) => side.trim());
  const replacedOperands = operands.replace(/\)|\(/g, ""); // REPLACE () BY ""
  let [dividend, divisor] = replacedOperands
    .split("/")
    .map((side) => side.trim());
  divisor = parseFloat(divisor);

  const dividendColumnIndex = dividend
    .split("+")
    .map((letter) => letter.trim())
    .map((letter) => getLetterIndex(letter));

  const resultantIndex = getLetterIndex(resultant);

  let updatedData = [];
  for (let i = 0; i < tableData.length; i++) {
    updatedData[i] = [];
    let result = "";
    for (let j = 0; j < tableData[0].length; j++) {
      if (i >= rowStartIndex - 1 && i <= rowEndIndex - 1) {
        if (resultantIndex === j) {
          result = result.split("").slice(0, -1).join("");
          // eslint-disable-next-line no-eval
          const resultant = parseFloat(eval(result)) / divisor;
          updatedData[i].push(resultant);
          continue;
        } else if (dividendColumnIndex.includes(j)) {
          result += tableData[i][j] + "+";
        }
      }

      updatedData[i].push(tableData[i][j]);
    }
  }

  return updatedData;
};

// TABLE STRUCTURE
// [{
//   key: "01",
//   rowData: [
//     { key: "001", entry: "roll no." }
//   ],
// }]

export const recordInit = {
  isUpdate: false,
  rows: 5,
  cols: 3,
  data: [],
  header: "",
  footer: "",
  error: {
    status: false,
    type: undefined,
  },
};

export const log = console.log;
export const recordReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case RECORD_ACTIONS.SET_COLS: {
      return {
        ...state,
        cols: payload,
      };
    }

    case RECORD_ACTIONS.SET_ROWS: {
      return {
        ...state,
        rows: payload,
      };
    }

    case RECORD_ACTIONS.SET_DATA: {
      return {
        ...state,
        data: [...setTableEntryKeys(state.rows, state.cols, payload)],
        error: {
          status: false,
          type: undefined,
        },
      };
    }

    case RECORD_ACTIONS.SAVE_DATA: {
      const twoD = [...state.data];
      const { header, data, footer } = payload;
      if (data.length > 0) {
        for (let i = 0; i < state.rows; i++) {
          for (let j = 0; j < state.cols; j++) {
            twoD[i].rowData[j].entry = data[i][j];
          }
        }
      }
      return {
        ...state,
        header,
        data: [...twoD],
        footer,
      };
    }
    case RECORD_ACTIONS.SET_RECORD_ERROR: {
      return {
        ...state,
        error: {
          status: true,
          type: RECORD_ACTIONS.SET_RECORD_ERROR,
        },
      };
    }
    case RECORD_ACTIONS.UPDATE_RECORD: {
      const { record } = payload;
      return {
        ...record,
        isUpdate: true,
      };
    }

    case RECORD_ACTIONS.DELETE_ROWS: {
      /*
      payload: {
        selectedItems: selectedRow_Column,
        contentData: getTableData(),
      },
       */
      const { selectedItems } = payload;
      let lengthDeleted = state.data.length;
      const updatedRecordData = [...state.data].filter((row) => {
        return !selectedItems.some((item) => {
          return item.key === row.key && item.row === true;
        });
      });

      lengthDeleted -= updatedRecordData.length;
      return {
        ...state,
        rows: state.rows - lengthDeleted,
        data: updatedRecordData,
      };
    }

    case RECORD_ACTIONS.DELETE_COLUMNS: {
      const { selectedItems } = payload;
      const filterKeys = selectedItems
        .filter((item) => item.column === true)
        .map((item) => item.key.split("-")[2]);

      let updatedRecordData = [...state.data];
      updatedRecordData = updatedRecordData.map((row) => {
        let rowData = [];
        row.rowData.forEach((data) => {
          const dataKey = data.key.split("-")[2];

          if (!filterKeys.includes(dataKey)) {
            rowData.push(data);
          }
        });
        return {
          key: row.key,
          rowData,
        };
      });

      return {
        ...state,
        cols: updatedRecordData[0].rowData.length,
        data: updatedRecordData,
      };
    }

    case RECORD_ACTIONS.AUTO_FILL: {
      const { fillData, tableData } = payload;
      const col_index = getLetterIndex(fillData.columnLetter);

      let count = 1;
      let updatedData = [];
      for (let i = 0; i < tableData.length; i++) {
        updatedData[i] = [];
        for (let j = 0; j < tableData[0].length; j++) {
          if (
            i >= fillData.rowStartIndex - 1 &&
            i <= fillData.rowEndIndex - 1 &&
            j === col_index
          ) {
            if (fillData.content?.trim() !== "")
              updatedData[i].push(fillData.content);
            else updatedData[i].push(count);
            count++;
            continue;
          }
          updatedData[i].push(tableData[i][j]);
        }
      }

      return {
        ...state,
        data: [...setTableEntryKeys(state.rows, state.cols, updatedData)],
      };
    }

    case RECORD_ACTIONS.AUTO_COMPUTE: {
      const { computeData, tableData } = payload;
      const { operation, rowStartIndex, rowEndIndex, query } = computeData;
      let basicOperations = "+-/*";
      let updatedData;
      if (basicOperations.includes(operation)) {
        updatedData = getASMD_data(
          operation,
          rowStartIndex,
          rowEndIndex,
          query,
          tableData
        );
      } else if (operation === "avg") {
        updatedData = getAverage(
          operation,
          rowStartIndex,
          rowEndIndex,
          query,
          tableData
        );
      }

      return {
        ...state,
        data: [...setTableEntryKeys(state.rows, state.cols, updatedData)],
      };
    }

    default:
      return {
        ...recordInit,
      };
  }
};
