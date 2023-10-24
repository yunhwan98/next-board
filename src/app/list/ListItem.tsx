"use client";

import Link from "next/link";

interface ListItemProps {
  result: { _id: string; title: string; content: string }[];
}

function ListItem({ result }: any) {
  return (
    <div>
      {result.map((item: any, idx: string) => (
        <div className="list-item" key={idx}>
          <Link href={`/detail/${item._id}`}>
            <h4>{item.title}</h4>
          </Link>
          <Link href={`/edit/${item._id}`}>📝</Link>
          <span
            onClick={(e) => {
              fetch(`/api/post/delete?_id=${item._id}`, {
                method: "DELETE",
              })
                .then((r) => {
                  if (r.status == 200) {
                    return r.json();
                  } else {
                    //서버가 에러코드전송시 실행할코드
                  }
                })
                .then((result) => {
                  //성공시 실행할코드
                  const target = e.target as HTMLSpanElement;
                  if (target.parentElement) {
                    const parent = target.parentElement;
                    parent.style.opacity = "0";
                    setTimeout(() => {
                      parent.style.display = "none";
                    }, 1000);
                  }
                })
                .catch((error) => {
                  //인터넷문제 등으로 실패시 실행할코드
                  console.log(error);
                });
            }}
          >
            🗑️
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}

export default ListItem;
