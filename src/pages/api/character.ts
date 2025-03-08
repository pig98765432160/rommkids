import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { birthday } = req.query;
  try {
    const snapshot = await db
      .collection("characters")
      .where("birthday", "==", birthday)
      .get();

    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json({ status: "success", data: results });
  } catch (err: any) {
    return res.status(500).json({ message: "查詢失敗", error: err.message });
  }
}
