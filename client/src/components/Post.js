import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Posts({ athletename, imageUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="StephCurry"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{athletename}</h3>
      </div>
      {/* header -> avatar + athletename */}

      <img className="post__image" src={imageUrl} alt="" />
      {/* image(s) */}
    </div>
  );
}

export default Posts;
