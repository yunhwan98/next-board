import React from "react";
import { connectDB } from "../../../util/database";
import Link from "next/link";
import ListItem from "./ListItem";

//dynamic rendering
export const dynamic = "force-dynamic";
//export const dynamic = 'force-static'
async function List() {
  // 축약 가능
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  let res = result.map((it) => {
    return { ...it, _id: it._id.toString() };
  });

  return <div className="list-bg">{<ListItem result={res} />}</div>;
}

export default List;
