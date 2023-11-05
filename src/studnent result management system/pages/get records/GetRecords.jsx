import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useUserContext from "../../context/userContex";

import GridLettering from "../../components/grid lettering/GridLettering";


import styles from "./GetRecords.module.css";

const GetRecords = () => {
  const [records, setRecords] = useState([]);
  const [userState] = useUserContext();
  const getRecords = useCallback(async (url, dataToSend) => {
    try {
      const response = await fetch("http://localhost:4040" + url, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.status === 500) {
        return new Error(result.message);
      }

      setRecords(result);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    getRecords("/records", { id: userState.id });
  }, [getRecords, userState]);

 
  return (
    <div className={styles["get-records"]}>
      <GridLettering
        word={"Your records"}
        letter_styles={{
          transform: "skew(15deg, -25deg)",
          marginTop: "2rem",
          textShadow: "0 0 .2rem rgba(0, 0, 0, .2)",
          border: "1px solid rgba(0, 0, 0, .15)",
        }}
      />

      <div className={styles["records"]}>
        {records.map((record, index) => {
          const date = new Date(record.createdAt);
          let hr = date.getHours(),
            min = date.getMinutes(),
            month = date.getMonth(),
            days = date.getDate(),
            year = date.getFullYear();

          if (hr < 10) hr = "0" + hr;
          if (min < 10) min = "0" + min;
          if (days < 10) days = "0" + days;
          if (month < 10) month = "0" + month;
          return (
            <Link key={record._id} to={"/get-records/record/" + record._id}>
              <div className={styles["record"]}>
                <div
                  className={styles["header"]}
                  dangerouslySetInnerHTML={{ __html: record.header }}
                />
                <p
                  className={styles["time"]}
                >{`${hr}:${min} ${days}/${month}/${year}`}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GetRecords;
