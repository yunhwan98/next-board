import React from "react";
import { connectDB } from "../../../util/database";
import Link from "next/link";

async function List() {
  // 축약 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="list-bg">
      {result.map((item, idx) => (
        <div className="list-item" key={idx}>
          <Link href={`/detail/${item._id}`}>
            <h4>{item.title}</h4>
          </Link>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}

export default List;
