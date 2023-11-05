import React from "react";

import "./Application.css";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import PostQuestions from "./pages/post questions/PostQuestions";
function Application() {
  return (
    <div className="fetena-app">
      <Header />
      <Routes>
        <Route path="/" element="HOME" />
        <Route path="/questions" element="QUESTIONS" />
        <Route path="/post-questions" element={<PostQuestions />}/>
        <Route path="/about" element="ABOUT US" />
        <Route path="/logout" element="LOGOUT" />
        <Route path="/sign-in" element="SIGN-IN" />
        <Route path="/sign-up" element="SIGN-UP" />
        <Route path="/user" element="USER" />
      </Routes>
    </div>
  );
}

export default Application;
