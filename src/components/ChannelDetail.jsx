import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia, Typography } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function ChannelDetail() {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  // Get the channel banner URL
  const channelBanner = channelDetail?.brandingSettings?.image?.bannerExternalUrl;

  useEffect(() => {
    // Fetch channel details and videos
    const fetchChannelData = async () => {
      try {
        const channelResponse = await fetchFromAPI(`channels?part=snippet&id=${id}`);
        setChannelDetail(channelResponse?.items[0]);

        const videosResponse = await fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`);
        setVideos(videosResponse?.items);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    fetchChannelData();
  }, [id]);

  return (
    <Box minHeight="95vh">
      {/* Channel Banner */}
      <Box>
        {channelBanner ? (
          <CardMedia
            image={channelBanner}
            sx={{
              height: "200px",
              width: "100%",
              objectFit: "cover", // Ensure the image covers the area
            }}
          />
        ) : (
          <Box
            sx={{
              background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
              zIndex: 10,
              height: "300px",
            }}
          />
        )}

        <ChannelCard channelDetail={channelDetail} marginTop="-60px" />
      </Box>

      {/* Recent Videos Section */}
      <Box p={5}>
        <Typography
          variant="h5"
          sx={{ color: "#f1f1f1", mb: "20px", textAlign: "center" }}
        >
          Recent Videos
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
}

export default ChannelDetail;
