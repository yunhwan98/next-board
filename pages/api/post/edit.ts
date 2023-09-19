import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/database";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    console.log(req);
    console.log(req.body);
    //예외 처리
    if (req.body.title == "") {
      return res.status(500).json("제목을 넣어주세요");
    }
    try {
      const { title, content, _id } = req.body;

      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .updateOne({ _id: new ObjectId(_id) }, { $set: { title, content } });

      return res.redirect(302, "/list");
    } catch (error) {
      return res.status(400).json("입력을 확인해주세요");
    }
  }
}
