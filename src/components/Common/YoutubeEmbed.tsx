import React, { FC, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Grid, 
  Button, 
  CircularProgress,
  Alert
} from "@mui/material";
import { 
  PlayArrow as PlayIcon, 
  Visibility as ViewIcon,
  AccessTime as TimeIcon,
  YouTube as YouTubeIcon
} from "@mui/icons-material";
import { YouTubeVideo, formatDuration, formatViewCount, formatPublishedTime } from '@/helpers/apis/youtubeApi';

interface Props {
  videoId?: string; // 保留原有的單一影片模式
  showLatestVideos?: boolean; // 新增：是否顯示最新影片列表
  maxResults?: number; // 新增：最多顯示幾個影片
  showChannelHeader?: boolean; // 新增：是否顯示頻道標題
}

const YouTubeEmbed: FC<Props> = (props) => {
  const { 
    videoId, 
    showLatestVideos = false, 
    maxResults = 6,
    showChannelHeader = true 
  } = props;
  
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const fetchLatestVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/youtube/latest?maxResults=${maxResults}`);
      const result = await response.json();
      
      if (result.success) {
        setVideos(result.data || []);
        // 自動選擇第一個影片作為預設播放
        if (result.data && result.data.length > 0) {
          setSelectedVideo(result.data[0].id);
        }
      } else {
        setError(result.error || '獲取影片失敗');
      }
    } catch (err) {
      setError('網路連接錯誤');
    } finally {
      setLoading(false);
    }
  }, [maxResults]);

  // 獲取最新影片
  useEffect(() => {
    if (showLatestVideos) {
      fetchLatestVideos();
    }
  }, [showLatestVideos, fetchLatestVideos]);

  // 單一影片模式
  if (videoId && !showLatestVideos) {
    return (
      <iframe
        width="100%"
        height="auto"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          aspectRatio: "16/9",
        }}
      />
    );
  }

  // 最新影片列表模式
  if (showLatestVideos) {
    return (
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
        {/* 頻道標題 */}
        {showChannelHeader && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <YouTubeIcon sx={{ color: '#FF0000', fontSize: 32 }} />
            <Typography variant="h5" component="h2" sx={{ 
              fontWeight: 'bold',
              color: '#333',
              flexGrow: 1
            }}>
              嗄歐麥麥遊戲直播
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<YouTubeIcon />}
              href="https://www.youtube.com/@ROMMgame"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: '#FF0000',
                '&:hover': { bgcolor: '#CC0000' },
                borderRadius: 2
              }}
            >
              訂閱頻道
            </Button>
          </Box>
        )}

        {/* 載入狀態 */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress color="error" />
          </Box>
        )}

        {/* 錯誤狀態 */}
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
            {error.includes('API key') && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                請聯繫管理員設定 YouTube API 金鑰以啟用此功能
              </Typography>
            )}
          </Alert>
        )}

        {/* 影片內容 */}
        {!loading && !error && videos.length > 0 && (
          <Grid container spacing={3}>
            {/* 主要播放器 */}
            <Grid item xs={12} md={8}>
              <Card sx={{ 
                bgcolor: '#000',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <Box sx={{ position: 'relative', aspectRatio: '16/9' }}>
                  {selectedVideo && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  )}
                </Box>
                {/* 影片資訊 */}
                {selectedVideo && (
                  <CardContent sx={{ bgcolor: 'white', p: 3 }}>
                    {(() => {
                      const currentVideo = videos.find(v => v.id === selectedVideo);
                      if (!currentVideo) return null;
                      
                      return (
                        <>
                          <Typography variant="h6" component="h3" sx={{ 
                            fontWeight: 'bold',
                            mb: 1,
                            color: '#333'
                          }}>
                            {currentVideo.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Chip
                              icon={<ViewIcon />}
                              label={currentVideo.viewCount ? formatViewCount(currentVideo.viewCount) : '載入中'}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              icon={<TimeIcon />}
                              label={formatPublishedTime(currentVideo.publishedAt)}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {currentVideo.description || '暫無描述'}
                          </Typography>
                        </>
                      );
                    })()} 
                  </CardContent>
                )}
              </Card>
            </Grid>

            {/* 影片列表 */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                最新影片
              </Typography>
              <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                {videos.map((video) => (
                  <Card 
                    key={video.id} 
                    onClick={() => setSelectedVideo(video.id)}
                    sx={{ 
                      mb: 2, 
                      cursor: 'pointer',
                      border: selectedVideo === video.id ? '2px solid #FF0000' : '1px solid #e0e0e0',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ position: 'relative', width: 120, height: 68, flexShrink: 0 }}>
                        {video.thumbnail && (
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                        {/* 播放按鈕覆蓋 */}
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: selectedVideo === video.id ? 0 : 1,
                          transition: 'opacity 0.2s ease'
                        }}>
                          <PlayIcon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        {/* 時長標籤 */}
                        {video.duration && (
                          <Chip
                            label={formatDuration(video.duration)}
                            size="small"
                            sx={{
                              position: 'absolute',
                              bottom: 4,
                              right: 4,
                              bgcolor: 'rgba(0,0,0,0.8)',
                              color: 'white',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ flex: 1, p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 'medium',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize: '0.85rem',
                          lineHeight: 1.3
                        }}>
                          {video.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {video.viewCount ? formatViewCount(video.viewCount) : '0'} 次觀看
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {formatPublishedTime(video.publishedAt)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}

        {/* 無影片狀態 */}
        {!loading && !error && videos.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <YouTubeIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              暫無影片
            </Typography>
            <Typography variant="body2" color="text.secondary">
              請稍後再試或檢查網路連接
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return null;
};

export default YouTubeEmbed;
