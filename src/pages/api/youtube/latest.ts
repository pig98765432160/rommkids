import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLatestVideos } from '@/helpers/apis/youtubeApi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { maxResults = 6 } = req.query;
    const result = await fetchLatestVideos(Number(maxResults));
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error('YouTube API 端點錯誤:', error);
    res.status(500).json({
      success: false,
      error: '伺服器內部錯誤'
    });
  }
}