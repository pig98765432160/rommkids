import { db } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const docRef = await db.collection("testCollection").add(req.body);
      return res.status(200).json({ message: "成功寫入 Firestore", id: docRef.id });
    } catch (error) {
      return res.status(500).json({ message: "Firestore 寫入錯誤", error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const snapshot = await db.collection("testCollection").get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: "Firestore 讀取錯誤", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
