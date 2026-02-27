import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 只允許 GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 讀取 query，防止 undefined / array / 空字串
  const { birthday } = req.query;
  if (!birthday) {
    return res
      .status(400)
      .json({ message: "birthday query parameter is required" });
  }

  const birthdayStr = Array.isArray(birthday) ? birthday[0] : birthday;
  if (!birthdayStr) {
    return res.status(400).json({ message: "birthday cannot be empty" });
  }

  try {
    // DEBUG: log 查詢值
    console.log("Query birthday:", birthdayStr);

    const snapshot = await db
      .collection("characters")
      .where("birthday", "==", birthdayStr)
      .get();

    const results = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // DEBUG: log 查到的資料
    console.log("Fetched characters:", results);

    return res.status(200).json({ status: "success", data: results });
  } catch (err: any) {
    console.error("API /character ERROR:", err);

    return res.status(500).json({
      message: "查詢失敗",
      error: err.message || "未知錯誤",
    });
  }
}
