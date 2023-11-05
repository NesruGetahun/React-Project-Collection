import React, { useState, useReducer } from "react";
import { Navigate } from "react-router-dom";

import useUserContext from "../contexts/user.context";

import { IP_ADDRESS } from "../Constants";
import "./Sign-in.css";
const input_init = {
  error_msg: null,
  username: "",
  password: "",
};
const input_reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME": {
      return {
        ...state,
        username: action.payload,
        error_msg: null,
      };
    }
    case "SET_PASSWORD": {
      return {
        ...state,
        password: action.payload,
        error_msg: null,
      };
    }
    case "USERNAME_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }
    case "PASSWORD_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }
    case "CONNECTION_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }

    default:
      return input_init;
  }
};
function SignIn() {
  const [redirect, setRedirect] = useState(false);
  const [input_state, input_dispatch] = useReducer(input_reducer, input_init);
  const [_, auth_dispatch] = useUserContext();
  const [to_home, set_to_home] = useState(false);

  if (redirect) {
    return <Navigate to="/sign-up" />;
  }

  if (to_home) {
    return <Navigate to="/" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const { username, password } = input_state;

    if (username.trim() === "" || username === undefined) {
      return input_dispatch({
        type: "USERNAME_ERROR",
        payload: "Username is required!",
      });
    } else if (password.trim() === "" || password === undefined) {
      return input_dispatch({
        type: "PASSWORD_ERROR",
        payload: "Password is required!",
      });
    }

    signIp();
  };

  const signIp = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/sign-in`, {
        method: "POST",
        body: JSON.stringify({
          username: input_state.username,
          password: input_state.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Username or password is wrong, try again!");
      }

      const result = await response.json();
      auth_dispatch({
        type: "AUTH",
        payload: {
          ...result,
        },
      });
      set_to_home(true);
    } catch (err) {
      return input_dispatch({
        type: "CONNECTION_ERROR",
        payload: err.message,
      });
    }
  };
  return (
    <div className="sign-in">
      <form onSubmit={submitHandler}>
        <h2>Sign-In</h2>
        {input_state.error_msg ? (
          <p className="error-msg">{input_state.error_msg}</p>
        ) : (
          ""
        )}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={input_state.username}
            onChange={(e) => {
              input_dispatch({
                type: "SET_USERNAME",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={input_state.password}
            onChange={(e) => {
              input_dispatch({
                type: "SET_PASSWORD",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <button>Sign-In</button>
      </form>
      <p className="p-link">
        If you aren't already sign-up,{" "}
        <span
          onClick={(e) => {
            setRedirect(true);
          }}
        >
          sign-up
        </span>
      </p>
    </div>
  );
}

export default SignIn;
