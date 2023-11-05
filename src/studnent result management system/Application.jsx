import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./Application.module.css";
import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import { UserContextProvider } from "./context/userContex";
import { userInit, userReducer } from "./context/userReducer";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/layout/Layout";
import CreateRecord from "./pages/create record/CreateRecord";
import GetRecords from "./pages/get records/GetRecords";
import Record from "./pages/get records/record page/Record";
const Application = () => {
  return (
    <UserContextProvider userInit={userInit} userReducer={userReducer}>
      <div className={styles.application}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/get-records" element={<Layout />}>
            <Route index element={<GetRecords />} />
            <Route path="/get-records/record/:id" element={<Record />} />
          </Route>
          <Route path="/create-record" element={<Layout />}>
            <Route index element={<CreateRecord />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          {/* <Route path="/sign-up" element={<CreateRecord />} /> */}
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </UserContextProvider>
  );
};

export default Application;
