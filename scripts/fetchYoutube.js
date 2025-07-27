// scripts/fetchYoutube.js
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'process.env.YOUTUBE_CHANNEL_ID';
const OUTPUT_PATH = path.join(__dirname, '../data/youtube.json');

async function fetchVideos() {
  const searchURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=5&type=video`;
  const searchRes = await fetch(searchURL);
  const searchJson = await searchRes.json();

  if (!searchJson.items) {
    throw new Error('Search API failed: ' + JSON.stringify(searchJson.error));
  }

  const videoIds = searchJson.items.map(item => item.id.videoId).join(',');
  const detailsURL = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`;
  const detailsRes = await fetch(detailsURL);
  const detailsJson = await detailsRes.json();

  const data = detailsJson.items.map(item => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails.medium.url,
    duration: item.contentDetails.duration,
    viewCount: item.statistics.viewCount
  }));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`[YouTube] Saved ${data.length} videos to ${OUTPUT_PATH}`);
}

fetchVideos().catch(err => {
  console.error('Failed to fetch YouTube data:', err.message);
  process.exit(1);
});
