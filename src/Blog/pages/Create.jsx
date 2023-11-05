import React, { useState, useReducer } from "react";
import { Navigate } from "react-router-dom";

import { IP_ADDRESS } from "../Constants";
import "./Create.css";
import useUserContext from "../contexts/user.context";
const input_init = {
  error_msg: null,
  image: "",
  title: "",
  summery: "",
  content: "",
};
const input_reducer = (state, action) => {
  switch (action.type) {
    case "SET_IMAGE": {
      return {
        ...state,
        image: action.payload,
        error_msg: null,
      };
    }
    case "SET_TITLE": {
      return {
        ...state,
        title: action.payload,
        error_msg: null,
      };
    }
    case "SET_SUMMERY": {
      return {
        ...state,
        summery: action.payload,
        error_msg: null,
      };
    }
    case "SET_CONTENT": {
      return {
        ...state,
        content: action.payload,
        error_msg: null,
      };
    }
    case "IMAGE_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }

    case "TITLE_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }
    case "SUMMERY_ERROR": {
      return {
        ...state,
        error_msg: action.payload,
      };
    }

    case "CONTENT_ERROR": {
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

function Create() {
  const [redirect, setRedirect] = useState(false);
  const [input_state, input_dispatch] = useReducer(input_reducer, input_init);
  const [auth, auth_dispatch] = useUserContext();

  if (redirect) {
    return <Navigate to="/" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const { image, title, summery, content } = input_state;

    if (image === "" || image === undefined) {
      return input_dispatch({
        type: "IMAGE_ERROR",
        payload: "Cover is required!",
      });
    } else if (title.trim() === "" || title === undefined) {
      return input_dispatch({
        type: "TITLE_ERROR",
        payload: "Title is required!",
      });
    } else if (
      summery.trim() === "" ||
      summery === undefined 
    ) {
      return input_dispatch({
        type: "SUMMERY_ERROR",
        payload: "Summery is required!",
      });
    } else if (
      summery.length > 300
    ) {
      return input_dispatch({
        type: "SUMMERY_ERROR",
        payload: "Summery is too long!",
      });
    } else if (content.trim() === "") {
      return input_dispatch({
        type: "CONTENT_ERROR",
        payload: "Content is required",
      });
    }

    console.log(input_state);
    postHandler();
  };

  const postHandler = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/post`, {
        method: "POST",
        body: JSON.stringify({
          image: input_state.image,
          title: input_state.title,
          summery: input_state.summery,
          content: input_state.content,
          token: auth.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "You aren't authorized for this action, sign-up!"
        );
      }

      const result = await response.json();
      console.log(result);

      setRedirect(true);
    } catch (err) {
      return input_dispatch({
        type: "CONNECTION_ERROR",
        payload: err.message,
      });
    }
  };
  return (
    <div className="create">
      <form onSubmit={submitHandler}>
        <h2>Create New Blog</h2>
        {input_state.error_msg ? (
          <p className="error-msg">{input_state.error_msg}</p>
        ) : (
          ""
        )}
        <div>
          <label htmlFor="cover">Cover image of the post</label>
          <input
            type="text"
            id="cover"
            value={input_state.image}
            onChange={(e) => {
              input_dispatch({
                type: "SET_IMAGE",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="title">Title of the post</label>
          <input
            type="text"
            id="title"
            value={input_state.title}
            onChange={(e) => {
              input_dispatch({
                type: "SET_TITLE",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label htmlFor="summery">Summey of the post</label>
          <textarea
            id="summery"
            className="summery"
            value={input_state.summery}
            onChange={(e) => {
              input_dispatch({
                type: "SET_SUMMERY",
                payload: e.target.value,
              });
            }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="content">Content of the post</label>
          <textarea
            id="content"
            className="content"
            value={input_state.content}
            onChange={(e) => {
              input_dispatch({
                type: "SET_CONTENT",
                payload: e.target.value,
              });
            }}
          ></textarea>
        </div>
        <button>Post</button>
      </form>
    </div>
  );
}

export default Create;
