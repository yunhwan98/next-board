import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";

interface values {
  title: string;
  content: string;
}

async function Edit(props: any) {
  const id = props.params.id;

  const db = (await connectDB).db("forum");
  let result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  return (
    <div className="p-20">
      <h4>수정페이지</h4>
      <form action={`/api/post/edit`} method="POST">
        <input name="title" defaultValue={result?.title} />
        <input name="content" defaultValue={result?.content} />
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result?._id.toString()}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default Edit;
