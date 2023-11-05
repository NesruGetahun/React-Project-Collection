import React, { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import useUserContext from "../contexts/user.context";
import { IP_ADDRESS } from "../Constants";
import "./User.css";
import Item from "../components/Item";

function User() {
  const [posts, setPosts] = useState([]);
  const [auth, auth_dispatch] = useUserContext();

  const getPosts = useCallback(async () => {
    try {
      const response = await fetch(`${IP_ADDRESS}/user-posts/${auth.user_id}`, {
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
      setPosts(result);
    } catch (err) {
      console.log(err);
    }
  }, [setPosts, auth]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log(posts);

  if (!auth.token) {
    return <Navigate to="/sign-up" />;
  }
  return (
    <div className="user">
      <h1>#{ auth.username} Posts</h1>
      {posts.map((post) => {
        return <Item key={post?._id} id={post?._id} post={post} />;
      })}
    </div>
  );
}

export default User;
