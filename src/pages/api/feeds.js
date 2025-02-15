import { db, storage } from "@/lib/db";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getNextFid() {
  const counterRef = db.collection("counters").doc("articles");
  const doc = await counterRef.get();

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
async function handleGet(req, res) {
  const { fid } = req.query;

  try {
    if (fid) {
      const doc = await db.collection("articles").doc(fid).get();
      if (!doc.exists) return res.status(404).json({ message: "文章不存在" });

      res.status(200).json({ status: "success", data: doc.data() });
    } else {
      const snapshot = await db.collection("articles").orderBy("fid", "asc").get();
      const articles = snapshot.docs.map(doc => doc.data());

      res.status(200).json({ status: "success", data: articles });
    }
  } catch (err) {
    res.status(500).json({ message: "取得文章失敗", error: err.message });
  }
}


// 新增文章
async function handlePost(req, res) {
   const { newPost } = req.body;
    debugger

  if (!newPost.title || !newPost.content || !newPost.author) {
    return res.status(400).json({ message: "請提供完整的文章內容" });
  }

  try {
    const fid = await getNextFid(); // 取得自增 `fid`
    const cover_url = `/assets/image/article/cover_${fid}.png`;

    await db.collection("articles").doc(String(fid)).set({
      fid,
      title:newPost.title,
      content:newPost.content,
      author:newPost.author,
      cover_url,
      dateline: Math.floor(Date.now() / 1000),
    });

    return res.status(200).json({ status: "success", data: { fid, title:newPost.title, content:newPost.content, author:newPost.author, cover_url } });
    // res.status(200).json({ status: "success", data: { fid, title, content, author, cover_url } });
  } catch (err) {
    res.status(500).json({ message: "儲存文章失敗", error: err.message });
  }
}



// 更新文章
async function handlePut(req, res) {
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
async function handleDelete(req, res) {
  const { fid } = req.body;
  if (!fid) return res.status(400).json({ message: "請提供文章 fid" });

  try {
    await db.collection("articles").doc(fid).delete();
    res.status(200).json({ status: "success", message: "刪除成功" });
  } catch (error) {
    res.status(500).json({ message: "刪除失敗", error });
  }
}

