// pages/api/youtube/latest.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "data/youtube.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: "無法讀取快取影片資料" });
  }
}
