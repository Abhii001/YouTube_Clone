import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoChannelTitle,
  demoChannelUrl,
  demoVideoTitle,
  demoVideoUrl,
  demoThumbnailUrl,
} from "../utils/constants";

function VideoCard({
  video: {
    id: { videoId },
    snippet,
  },
}) {
  const videoLink = videoId ? `/video/${videoId}` : demoVideoUrl;
  const channelLink = snippet?.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl;
  
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={videoLink}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title || demoVideoTitle}
          sx={{
            width: "100%",
            height: 150,
            objectFit: "cover",
          }}
        />
      </Link>

      <CardContent sx={{ backgroundColor: "hsl(0, 0%, 7%)", height: "106px" }}>
        <Link to={videoLink}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#f1f1f1"
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
          >
            {snippet?.title || demoVideoTitle}
          </Typography>
        </Link>
        <Link to={channelLink}>
          <Typography variant="subtitle2" fontWeight="bold" color="gray" display="flex" alignItems="center">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default VideoCard;
