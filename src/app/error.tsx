"use client";

import React from "react";

function Error({ error, reset }) {
  return (
    <div>
      error
      <button
        onClick={() => {
          //실행시 페이지 다시 로드
          reset();
        }}
      >
        버튼
      </button>
    </div>
  );
}

export default Error;
