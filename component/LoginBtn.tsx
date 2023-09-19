"use client";

import { signIn } from "next-auth/react";
import React from "react";

function LoginBtn() {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      로그인
    </button>
  );
}

export default LoginBtn;
