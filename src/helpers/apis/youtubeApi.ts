import axios from 'axios';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  viewCount?: string;
  likeCount?: string;
  duration?: string;
}

export interface YouTubeAPIResponse {
  success: boolean;
  data?: YouTubeVideo[];
  error?: string;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCdGBWADQYJpnq7KNOJBfYpA';

// YouTube Data API v3 基礎 URL
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * 從 YouTube 頻道獲取最新影片
 * @param maxResults 最多返回的影片數量 (預設: 6)
 * @returns Promise<YouTubeAPIResponse>
 */
export const fetchLatestVideos = async (maxResults: number = 6): Promise<YouTubeAPIResponse> => {
  try {
    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'your-youtube-api-key-here') {
      return {
        success: false,
        error: 'YouTube API key 未設定，請在環境變數中設定 YOUTUBE_API_KEY'
      };
    }

    // 第一步：搜索頻道最新影片
    const searchResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        channelId: YOUTUBE_CHANNEL_ID,
        part: 'snippet',
        order: 'date',
        maxResults: maxResults,
        type: 'video'
      }
    });

    const videos: YouTubeVideo[] = searchResponse.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
    }));

    // 第二步：獲取影片的詳細統計資料（觀看次數、點讚數、時長等）
    if (videos.length > 0) {
      const videoIds = videos.map(video => video.id).join(',');
      const statisticsResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
        params: {
          key: YOUTUBE_API_KEY,
          id: videoIds,
          part: 'statistics,contentDetails'
        }
      });

      // 將統計資料合併到影片資料中
      statisticsResponse.data.items.forEach((statsItem: any, index: number) => {
        if (videos[index]) {
          videos[index].viewCount = statsItem.statistics.viewCount;
          videos[index].likeCount = statsItem.statistics.likeCount;
          videos[index].duration = statsItem.contentDetails.duration;
        }
      });
    }

    return {
      success: true,
      data: videos
    };

  } catch (error) {
    console.error('YouTube API 錯誤:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '獲取 YouTube 影片失敗'
    };
  }
};

/**
 * 將 YouTube 影片時長從 ISO 8601 格式轉換為可讀格式
 * @param duration ISO 8601 格式的時長 (例如: PT4M13S)
 * @returns 格式化的時長字符串 (例如: 4:13)
 */
export const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * 將觀看次數格式化為可讀格式
 * @param viewCount 觀看次數
 * @returns 格式化的觀看次數字符串
 */
export const formatViewCount = (viewCount: string): string => {
  const count = parseInt(viewCount);
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * 將發布時間格式化為相對時間
 * @param publishedAt ISO 8601 格式的發布時間
 * @returns 相對時間字符串
 */
export const formatPublishedTime = (publishedAt: string): string => {
  const now = new Date();
  const publishedDate = new Date(publishedAt);
  const diffInSeconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '剛剛';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} 分鐘前`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} 小時前`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} 天前`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} 個月前`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} 年前`;
  }
};