import React, { useState, useEffect, useCallback } from "react";
import useUserContext from "../contexts/user.context";
import { useParams, Navigate } from "react-router-dom";

import { IP_ADDRESS } from "../Constants";

import "./Detail.css";
function Detail() {
  const { post_id } = useParams();
  const [post, setPost] = useState(null);
  const [auth, _] = useUserContext();
  const [redirect, setRedirect] = useState(false);
  const [to_home, set_to_home] = useState(false);
  const [to_edit, set_to_edit] = useState(false);

  const getPost = useCallback(async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/post/${post_id}`, {
        method: "POST",
        body: JSON.stringify({
          token: auth.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("You aren't authenticated, sign up to be authorized");
      }
      const result = await response.json();
      setPost(result);
    } catch (err) {
      console.log(err);
      setRedirect(true);
    }
  }, [setPost, auth, post_id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  const editPost = () => {
    set_to_edit(true);
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/post/${post_id}`, {
        method: "DELETE",
        body: JSON.stringify({
          token: auth.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      const result = await response.json();
      console.log(result);
      set_to_home(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Navigate to="/sign-in" />;
  }

  if (to_home) {
    return <Navigate to="/" />;
  }

  if (to_edit) {
    return <Navigate to={`/edit/${post_id}`} />;
  }

  return (
    <div className="detail-page">
      <h1>{post?.title}</h1>
      <div className="author">
        <h4>By {post?.creator.username}</h4>
        <h4>{new Date().toISOString()}</h4>
      </div>
      {post?.creator._id === auth.user_id ? (
        <div className="action">
          <button onClick={(e) => editPost()}>Edit</button>
          <button onClick={(e) => deletePost()}>Delete</button>
        </div>
      ) : (
        ""
      )}

      <div className="img-cont">
        <img src={require("../assets/images/img-6.jpg")} alt="blog cover" />
      </div>
      <p className="content">{post?.content}</p>
    </div>
  );
}

export default Detail;
