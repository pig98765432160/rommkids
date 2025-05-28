import { db } from "@/lib/db";

export default async function handler(req, res) {
  const { fid } = req.query;
  try {
    const doc = await db.collection("articles").doc(fid).get();
    if (!doc.exists) return res.status(404).json({ message: "文章不存在" });
    res.status(200).json({ status: "success", data: doc.data() });
  } catch (err) {
    res.status(500).json({ message: "取得文章失敗", error: err.message });
  }
}
