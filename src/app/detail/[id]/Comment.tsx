"use client";

import React, { useEffect, useState } from "react";

interface CommentProps {
  _id: string;
}

function Comment({ _id }: CommentProps) {
  let [comment, setComment] = useState("");

  return (
    <div>
      <div>댓글목록 보여줄 부분</div>
      <input onChange={(e) => setComment(e.currentTarget.value)} />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment, parent: _id }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}

export default Comment;
