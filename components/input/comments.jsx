"use client";

import { useState, useEffect } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);


  useEffect(() => {
    if (showComments) {
      fetch(`/api/getComments/${eventId}`)
        .then((res) => res.json())
        .then((data) => setFilteredComments(data.filteredComments));
    }
  }, [showComments]);


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/addComments/${eventId}`, {
      method: "POST",
      headers: {
        "content-tyoe": "application/json",
      },
      body: JSON.stringify({
        userEmail: commentData.email,
        userName: commentData.name,
        commentText: commentData.text,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList filteredComments={filteredComments}/>}
    </section>
  );
}

export default Comments;
