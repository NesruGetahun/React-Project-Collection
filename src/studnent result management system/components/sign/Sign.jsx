import React, { useReducer } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./Sign.module.css";
import Input from "../Input/Input";
import Button from "../button/Button";
import GridLettering from "../grid lettering/GridLettering";
import useUserContext from "../../context/userContex";
import SIGN_ACTION, { signInit, signReducer } from "./reducer/signReducer";
import ACTION_TYPE from "../../context/userReducer";

const Sign = ({ redirectedTo, type, redirectionText, submitText }) => {
  const showInput = type === "SIGN-UP";
  const [userState, userDispatch] = useUserContext();
  const [signState, signDispatch] = useReducer(signReducer, signInit);
  if (userState.id) {
    return <Navigate to="/" />;
  }

  const postSignInfo = async (url, data, action) => {
    try {
      const response = await fetch(`http://localhost:4040${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.status === 500) {
        throw new Error(result.message);
      }
      userDispatch({
        type: action,
        payload: result,
      });
    } catch (err) {
      signDispatch({
        type: SIGN_ACTION.SET_FETCH_ERROR,
      });
      console.log(err.message);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const nameRegEx = /\b^\D{4,}\w*\b/i;
    const emailRegEx = /^\D+\w*@gmail.com/i;
    if (!nameRegEx.test(signState.name) && showInput) {
      signDispatch({ type: SIGN_ACTION.SET_NAME_ERROR });
    } else if (!emailRegEx.test(signState.email)) {
      signDispatch({ type: SIGN_ACTION.SET_EMAIL_ERROR });
    } else if (
      signState.password.trim() === "" ||
      signState.password.length < 4
    ) {
      signDispatch({ type: SIGN_ACTION.SET_PASSWORD_ERROR });
    } else if (signState.password !== signState.confirmPassword && showInput) {
      signDispatch({ type: SIGN_ACTION.SET_CONFIRM_PASSWORD_ERROR });
    } else {
      if (type === "SIGN-UP") {
        postSignInfo(
          "/sign-up",
          {
            username: signState.name,
            email: signState.email,
            password: signState.password,
          },
          ACTION_TYPE.SIGN_UP
        );
      } else if ("SIGN-IN") {
        postSignInfo(
          "/sign-in",
          {
            email: signState.email,
            password: signState.password,
          },
          ACTION_TYPE.SIGN_IN
        );
      }
    }
  };
  return (
    <div className={styles.sign}>
      <div
        className={styles["sign-container"]}
        style={{
          border:
            signState.error.type === SIGN_ACTION.SET_FETCH_ERROR
              ? "1.2px solid red"
              : "",
        }}
      >
        <GridLettering
          word={submitText + " for student record management system"}
          letter_styles={{ transform: "skew(0, 10deg)" }}
          container_styles={{ marginBottom: "1em" }}
        />
        <form onSubmit={submitHandler}>
          {showInput && (
            <Input
              id={"name-id"}
              labelText={"Enter your name"}
              inputStyles={
                signState.error.type === SIGN_ACTION.SET_NAME_ERROR
                  ? { border: "1.4px solid red" }
                  : {}
              }
              value={signState.name}
              onChangeHandler={(event) => {
                signDispatch({
                  type: SIGN_ACTION.SET_NAME,
                  payload: event.target.value,
                });
              }}
            />
          )}
          <Input
            id={"email-id"}
            labelText={"Enter your email"}
            type="email"
            inputStyles={
              signState.error.type === SIGN_ACTION.SET_EMAIL_ERROR
                ? { border: "1.4px solid red" }
                : {}
            }
            value={signState.email}
            onChangeHandler={(event) => {
              signDispatch({
                type: SIGN_ACTION.SET_EMAIL,
                payload: event.target.value,
              });
            }}
          />
          <Input
            id={"password-id"}
            labelText={"Enter your password"}
            type="password"
            inputStyles={
              signState.error.type === SIGN_ACTION.SET_PASSWORD_ERROR
                ? { border: "1.4px solid red" }
                : {}
            }
            value={signState.password}
            onChangeHandler={(event) => {
              signDispatch({
                type: SIGN_ACTION.SET_PASSWORD,
                payload: event.target.value,
              });
            }}
          />
          {showInput && (
            <Input
              id={"confirm-password-id"}
              labelText={"Enter your confrim password"}
              type="password"
              inputStyles={
                signState.error.type === SIGN_ACTION.SET_CONFIRM_PASSWORD_ERROR
                  ? { border: "1.4px solid red" }
                  : {}
              }
              value={signState.confirmPassword}
              onChangeHandler={(event) => {
                signDispatch({
                  type: SIGN_ACTION.SET_CONFIRM_PASSWORD,
                  payload: event.target.value,
                });
              }}
            />
          )}
          <Button
            text={submitText}
            btnStyles={{
              backgroundColor: "#1cba1c",
              fontWeight: "700",
              borderRadius: ".1rem",
            }}
          />
        </form>
        <p>
          {redirectionText},{" "}
          <Link to={redirectedTo}>{redirectedTo?.replace("/", "")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
