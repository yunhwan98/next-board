import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/database";
import bcrypt from "bcrypt";
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      console.log(req.body);

      let hash = await bcrypt.hash(req.body.password, 10);
      //console.log(hash);
      req.body.password = hash;

      const db = (await connectDB).db("forum");

      let result = await db.collection("user_cred").insertOne(req.body);

      return res.status(200).json("가입성공");
      //   return res.status(200).json("성공");
    } catch (error) {
      // return res.status(400).json("입력을 확인해주세요");
    }
  }
}
