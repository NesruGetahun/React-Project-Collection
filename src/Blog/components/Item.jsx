import React from "react";
import { Link } from "react-router-dom";

import useUserContext from "../contexts/user.context";

import "./Item.css";

function Item({ post, id }) {
  const { image, title, createdAt, creator, likes, summery } = post;
  const [auth, auth_dispatch] = useUserContext();
  return (
    <Link to={`/detail/${id}`} className="detail-btn">
      <div className="item">
        <div className="img-cont">
          <img
            src={require("../assets/images/img-1.jpg")}
            alt="content cover"
          />
          <div className="favour">
            <p>
              <span className="like">👍</span>
              <span className="favour-count">{likes}</span>
            </p>
          </div>
        </div>
        <div className="info">
          <h1>{title}</h1>
          <div className="author">
            {" "}
            {post?.creator._id === auth.user_id ? (
              <span className="username">You</span>
            ) : (
              <span className="username">By {creator?.username}</span>
            )}
            <time>{new Date(createdAt).toISOString()}</time>
          </div>
          <p>{summery}</p>
        </div>
      </div>
    </Link>
  );
}

export default Item;
