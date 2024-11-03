import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle, ThumbDownOutlined, ThumbUpOutlined } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoComments from "./VideoComments";
import VideoDetailsSkeleton from "./VideoDeailsSkeleton";

function VideoDetail() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchVideoData = async () => {
      const videoResponse = await fetchFromAPI(`videos?part=snippet,statistics&id=${id}`);
      setVideoDetail(videoResponse.items[0]);

      const relatedVideosResponse = await fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`);
      setVideos(relatedVideosResponse.items);
    };

    fetchVideoData();
  }, [id]);

  if (!videoDetail?.snippet) return <VideoDetailsSkeleton />;

  const {
    snippet: { publishedAt, channelId, title, description, channelTitle, tags },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }} sx={{ p: "1.5rem" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px", zIndex: 1 }}>
            <ReactPlayer width="100%" url={`https://www.youtube.com/watch?v=${id}`} controls />
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#fff", py: 1, px: 2 }}>
              {title}
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.5} sx={{ color: "#fff" }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography
                  display="flex"
                  alignItems="center"
                  color="gray"
                  fontWeight="bold"
                  whiteSpace="nowrap"
                >
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: 12, color: "gray", ml: 1 }} />
                </Typography>
              </Link>
              <Typography
                variant="body1"
                fontSize={{ xs: "10px", sm: "1rem" }}
                sx={{
                  opacity: 0.7,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  p: 0.5,
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ThumbUpOutlined sx={{ fontSize: 20, color: "gray" }} />
                {Number(likeCount).toLocaleString()} |{" "}
                <ThumbDownOutlined sx={{ fontSize: 20, color: "gray" }} />
              </Typography>
            </Stack>

            {/* Description Section */}
            <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "30px", p: 2, mt: 2 }}>
              <Box sx={{ color: "gray" }}>
                <Typography>{Number(viewCount).toLocaleString()} views</Typography>
                <Typography fontWeight="bold">Published at {publishedAt}</Typography>

                {/* Tags Section */}
                <Box>
                  {tags.map((tag, index) => (
                    <Typography key={index} sx={{ display: "inline-block", color: "#3366CC" }}>
                      {showMoreTags || index < 5 ? `#${tag}` : "#..."}
                    </Typography>
                  ))}
                  {tags.length > 5 && (
                    <button
                      style={{ outline: "none", border: "none", backgroundColor: "transparent", color: "#3366CC" }}
                      onClick={() => setShowMoreTags((prev) => !prev)}
                    >
                      {showMoreTags ? "Show less" : "Show more"}
                    </button>
                  )}
                </Box>

                {/* Description */}
                <Typography sx={{ color: "#fff", overflow: "auto" }}>
                  {showMoreDesc ? description : `${description.substring(0, 250)}...`}
                  <button
                    style={{
                      outline: "none",
                      border: "none",
                      fontSize: 14,
                      backgroundColor: "transparent",
                      color: "rgba(255,255,255,0.8)",
                    }}
                    onClick={() => setShowMoreDesc((prev) => !prev)}
                  >
                    {showMoreDesc ? "Show less" : "Show more"}
                  </button>
                </Typography>
              </Box>
            </Box>

            {/* Comments Section */}
            <Typography sx={{ color: "#f1f1f1", my: "1rem", mx: "1rem" }}>Comments</Typography>
            <VideoComments id={id} />
          </Box>
        </Box>

        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
