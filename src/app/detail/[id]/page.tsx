import React from "react";
import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";

interface DetailProps {}

async function Detail(props: any) {
  const id = props.params.id;

  //console.log(id);
  // 축약 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  return (
    <div>
      <h4>상세페이지</h4>
      <h4>{result?.title}</h4>
      <h4>{result?.content}</h4>
    </div>
  );
}

export default Detail;
