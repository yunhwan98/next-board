"use client";
import React, { useState } from "react";

function Write() {
  let [src, setSrc] = useState("");

  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />

        <input name="content" placeholder="글내용" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            //첫번째 파일 선택
            let target = e.currentTarget;
            let file = (target.files as FileList)[0];

            //파일 이름 인코딩
            let filename = encodeURIComponent(file.name);
            let res = await fetch("api/post/image?file=" + filename);
            res = await res.json();

            //S3 업로드
            const formData = new FormData();

            Object.entries({ ...(res as any).fields, file }).forEach(
              ([key, value]) => {
                formData.append(key, value as any);
              }
            );
            let upload = await fetch(res.url, {
              method: "POST",
              body: formData,
            });
            console.log(upload);

            if (upload.ok) {
              setSrc(upload.url + "/" + filename);
            } else {
              console.log("실패");
            }
          }}
        />
        <img src={src} />
        <input type="hidden" name="image" value={src} />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}

export default Write;
