import { useState, useEffect } from "react";
import { Stack, CardMedia, Box, Typography, CircularProgress } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function VideoComments({ id }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await fetchFromAPI(`commentThreads?part=snippet&videoId=${id}`);
        setComments(data.items);
      } catch (err) {
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress sx={{ color: 'white' }} />
        <Typography sx={{ color: "white", ml: "1rem" }}>Loading comments...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ color: "red", ml: "1rem" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Stack
      direction="column"
      gap="1rem"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "30px",
        p: "15px",
        marginTop: "10px",
      }}
    >
      {comments.map((comment) => (
        <Stack
          direction="row"
          gap="1rem"
          alignItems="center"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            borderRadius: "30px",
            p: "15px",
          }}
          key={comment.id}
        >
          <CardMedia
            image={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
            sx={{ borderRadius: "50%", height: "30px", width: "30px" }}
          />
          <Stack direction="column">
            <Typography sx={{ color: "gray", fontSize: "15px" }}>
              {comment.snippet.topLevelComment.snippet.authorDisplayName}
            </Typography>
            <Typography sx={{ color: "white" }}>
              {comment.snippet.topLevelComment.snippet.textOriginal}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

export default VideoComments;
