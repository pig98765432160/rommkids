import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getNextFid() {
  const counterRef = db.collection("counters").doc("articles");
  const doc: any = await counterRef.get();

  if (!doc.exists) {
    await counterRef.set({ count: 1 });
    return 1;
  } else {
    const newFid = doc.data().count + 1;
    await counterRef.update({ count: newFid });
    return newFid;
  }
}

// 取得文章
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  // const { fid } = req.query;
  const { board, tag, page = 1, limit = 10 }: any = req.query;
  if (!board) {
    return res.status(400).json({ message: "請提供 board 參數" });
  }

  try {
    let query = db.collection("articles").where("board", "==", board);
    if (tag) {
      query = query.where("tags", "array-contains", tag);
    }
    const snapshot = await query
      .limit(limit)
      .offset((page - 1) * limit)
      .get();
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json({ status: "success", data: articles });

    // if (fid) {
    //   const doc = await db.collection("articles").doc(fid).get();
    //   if (!doc.exists) return res.status(404).json({ message: "文章不存在" });

    //   res.status(200).json({ status: "success", data: doc.data() });
    // } else {
    // const snapshot = await db.collection("articles").orderBy("fid", "asc").get();
    // const articles = snapshot.docs.map(doc => doc.data());

    // res.status(200).json({ status: "success", data: articles });
    // }
  } catch (err: any) {
    res.status(500).json({ message: "取得文章失敗", error: err.message });
  }
}

// 新增文章
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { newPost } = req.body;
  if (!newPost.title || !newPost.content || !newPost.author) {
    return res.status(400).json({ message: "請提供完整的文章內容" });
  }

  try {
    const fid = await getNextFid(); // 取得自增 `fid`
    const cover_url = `/assets/image/article/cover_${fid}.png`;

    await db
      .collection("articles")
      .doc(String(fid))
      .set({
        fid,
        board: newPost.board,
        title: newPost.title,
        content: newPost.content,
        desc: newPost.desc,
        author: newPost.author,
        createAt: Math.floor(Date.now() / 1000),
        updateAt: Math.floor(Date.now() / 1000),
        tags: newPost.tags || [],
        cover: cover_url,
      });

    return res.status(200).json({ status: "success", data: { fid } });
  } catch (err: any) {
    res.status(500).json({ message: "儲存文章失敗", error: err.message });
  }
}

// 更新文章
async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { fid, title, content } = req.body;
  if (!fid) return res.status(400).json({ message: "請提供文章 fid" });

  try {
    await db.collection("articles").doc(fid).update({ title, content });

    res.status(200).json({ status: "success", message: "更新成功" });
  } catch (error) {
    res.status(500).json({ message: "更新失敗", error });
  }
}

// 刪除文章
async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { fid } = req.body;
  if (!fid) return res.status(400).json({ message: "請提供文章 fid" });

  try {
    await db.collection("articles").doc(fid).delete();
    res.status(200).json({ status: "success", message: "刪除成功" });
  } catch (error) {
    res.status(500).json({ message: "刪除失敗", error });
  }
}
