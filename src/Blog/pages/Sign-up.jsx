import React, { useState, useReducer } from "react";
import { Navigate } from "react-router-dom";

import { IP_ADDRESS } from "../Constants";
import "./Sign-up.css";
const input_init = {
  error_msg: null,
  username: "",
  password: "",
  email: "",
  confirm_password: "",
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
    case "SET_EMAIL": {
      return {
        ...state,
        email: action.payload,
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
    case "SET_CONFRIM_PASSWORD": {
      return {
        ...state,
        confirm_password: action.payload,
        error_msg: null,
      };
    }
    case "USERNAME_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }

    case "EMAIL_ERROR": {
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

    case "CONFRIM_PASSWORD_ERROR": {
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

function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [input_state, input_dispatch] = useReducer(input_reducer, input_init);

  if (redirect) {
    return <Navigate to="/sign-in" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const { username, email, password, confirm_password } = input_state;

    if (username.trim() === "" || username === undefined) {
      return input_dispatch({
        type: "USERNAME_ERROR",
        payload: "Username is required!",
      });
    } else if (email.trim() === "" || !email.includes("@")) {
      return input_dispatch({
        type: "EMAIL_ERROR",
        payload: "E-mail is required!",
      });
    } else if (password.trim() === "" || password === undefined) {
      return input_dispatch({
        type: "PASSWORD_ERROR",
        payload: "Password is required!",
      });
    } else if (confirm_password !== password) {
      return input_dispatch({
        type: "CONFRIM_PASSWORD_ERROR",
        payload: "Password has to match!",
      });
    }

    console.log(input_state);
    signUp();
  };

  const signUp = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/sign-up`, {
        method: "POST",
        body: JSON.stringify({
          username: input_state.username,
          password: input_state.password,
          email: input_state.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Username is already used, choose other name");
      }

      setRedirect(true);
    } catch (err) {
      return input_dispatch({
        type: "CONNECTION_ERROR",
        payload: err.message,
      });
    }
  };

  return (
    <div className="sign-up">
      <form onSubmit={submitHandler}>
        <h2>Sign-Up</h2>
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
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={input_state.email}
            onChange={(e) => {
              input_dispatch({
                type: "SET_EMAIL",
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
        <div>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            value={input_state.confirm_password}
            onChange={(e) => {
              input_dispatch({
                type: "SET_CONFRIM_PASSWORD",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <button>Sign-Up</button>
      </form>
      <p className="p-link">
        If you are already sign-up,{" "}
        <span
          onClick={(e) => {
            setRedirect(true);
          }}
        >
          {" "}
          sign-in
        </span>
      </p>
    </div>
  );
}

export default SignUp;
