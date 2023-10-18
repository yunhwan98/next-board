import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/database";

export default async function handler(req: any, res: any) {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    //가져오고 싶은 게시물의 _id를 넣어주기
    .find({ parent: new ObjectId(req.query.id) })
    .toArray();

  res.status(200).json(result);
}
