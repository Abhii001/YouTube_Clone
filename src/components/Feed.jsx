import { useState } from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import useFetchVideos from "./useFetchVideos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New Videos");

  // Use custom hook to fetch videos based on selected category
  const { data: videos, error, loading } = useFetchVideos(`search?part=snippet&q=${selectedCategory}`);

  // Rendering logic based on loading and error states
  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid hsl(0, 0%, 18.92%)",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box
        p={2}
        sx={{
          overflow: "auto",
          height: "90vh",
          flex: 2,
          mr: "5px",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error.message || "An error occurred"}</Typography> // Ensure to render a string message
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
