import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const getAllFeedIdsFromFirestore = async () => {
  const snapshot = await db.collection("articles").get();
  const feedIds = snapshot.docs.map((doc) => doc.id);

  return feedIds;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const feedIds = await getAllFeedIdsFromFirestore();
    res.status(200).json({ status: "success", data: feedIds });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Unable to fetch feed IDs" });
  }
}
