"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface DarkModeBtnProps {
  mode: string | undefined;
}

function DarkModeBtn({ mode }: DarkModeBtnProps) {
  let router = useRouter();

  useEffect(() => {
    //cookie 유무확인

    if (mode) {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  return (
    <span
      onClick={() => {
        if (mode === "dark") {
          document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
          //새로고침
          router.refresh();
        } else {
          document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
          router.refresh();
        }
        console.log(mode);
      }}
    >
      {mode === "dark" ? "☀️" : "🌙"}
    </span>
  );
}

export default DarkModeBtn;
