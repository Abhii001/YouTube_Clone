import { Box, CardContent, Typography, CardMedia, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

function ChannelCard({ channelDetail, marginTop }) {
  const {
    id: { channelId },
    snippet,
    statistics,
  } = channelDetail || {};

  return (
    <Stack
      direction="column"
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        width: { xs: "100%", md: "80%", lg: "70%" },
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={channelId ? `/channel/${channelId}` : "#"}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            gap: "5px",
          }}
        >
          <CardMedia
            image={snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={snippet?.title}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              objectFit: "cover", // Maintain aspect ratio
            }}
          />

          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            {snippet?.title}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            textAlign="center"
            sx={{
              color: "gray",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Typography>{snippet?.customUrl}</Typography>
            {statistics?.subscriberCount && (
              <Typography>
                {parseInt(statistics.subscriberCount).toLocaleString("en-US")}{" "}
                Subscribers
              </Typography>
            )}
            {statistics?.videoCount && (
              <Typography>
                {parseInt(statistics.videoCount).toLocaleString("en-US")}{" "}
                Videos
              </Typography>
            )}
          </Stack>

          {snippet?.description && (
            <Typography
              sx={{
                color: "gray",
                fontSize: "14px",
                textAlign: "center",
                width: "fit-content",
              }}
            >
              {snippet.description}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Stack>
  );
}

export default ChannelCard;
