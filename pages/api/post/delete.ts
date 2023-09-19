import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/database";

export default async function handler(req: any, res: any) {
  if (req.method === "DELETE") {
    try {
      const { _id } = req.query;
      console.log(_id);

      const db = (await connectDB).db("forum");
      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(_id) });

      return res.status(200).json("성공");
    } catch (error) {
      // return res.status(400).json("입력을 확인해주세요");
    }
  }
}
