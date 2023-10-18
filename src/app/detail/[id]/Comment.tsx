"use client";

import React, { useEffect, useState } from "react";

interface CommentProps {
  _id: string;
}

interface comment {
  author: string;
  comment: string;
  _id: string;
}

function Comment({ _id }: CommentProps) {
  let [comment, setComment] = useState<string>("");
  let [data, setData] = useState<comment[]>([]);

  useEffect(() => {
    fetch(`/api/comment/list?id=${_id}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <div>
      <hr></hr>
      <div>
        {data.length > 0
          ? data.map((a, idx) => {
              return <p key={idx}>{a.comment}</p>;
            })
          : "댓글 없음"}
      </div>
      <input onChange={(e) => setComment(e.currentTarget.value)} />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment, parent: _id }),
          })
            .then((res) => res.json())
            .then((res) => setData(res));
        }}
      >
        댓글전송
      </button>
    </div>
  );
}

export default Comment;
