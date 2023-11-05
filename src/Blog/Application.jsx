import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Layout from "./components/Layout";

import styles from "./Application.module.css";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";

import { UserContextProvider } from "./contexts/user.context";

import { user_reducer, init_value } from "./contexts/user.reducer";
import User from "./pages/User";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";

function Application() {
  return (
    <UserContextProvider init_value={init_value} reducer={user_reducer}>
      <div className={styles["application"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/user" element={<User />} />
            <Route path="/create" element={<Create />} />
            <Route path="/detail/:post_id" element={<Detail />} />
            <Route path="/edit/:post_id" element={<Edit />} />
          </Route>
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default Application;
