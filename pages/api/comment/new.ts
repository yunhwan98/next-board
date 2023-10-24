import { ObjectId } from "mongodb";
import { connectDB } from "../../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {
  //현재 유저의 정보를 받아오기
  let session: any = await getServerSession(req, res, authOptions);

  console.log(session);
  if (req.method === "POST") {
    const bodyJSON = JSON.parse(req.body);

    let data = {
      ...bodyJSON,
      author: session?.user?.name,
      parent: new ObjectId(bodyJSON.parent),
    };

    //예외 처리
    if (bodyJSON.comment == "") {
      return res.status(500).json("댓글을 입력해주세요");
    }
    try {
      const db = (await connectDB).db("forum");
      let result = await db.collection("comment").insertOne(data);

      let comments = await db
        .collection("comment")
        //가져오고 싶은 게시물의 _id를 넣어주기
        .find({ parent: new ObjectId(bodyJSON.parent) })
        .toArray();

      return res.status(200).json(comments);
      //return res.redirect(302, "/list");
    } catch (error) {
      console.log(error);
      return res.status(400).json("입력을 확인해주세요");
    }
  }
}
