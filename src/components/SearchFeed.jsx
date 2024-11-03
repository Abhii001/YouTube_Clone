import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function SearchFeed() {
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [videos, setVideos] = useState([]); // Fixed typo from "setVidoes" to "setVideos"
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
        setVideos(data.items);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      }
    };

    if (searchTerm) {
      fetchVideos();
    }
  }, [searchTerm]);

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", md: "row" },
      }}
    >
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
          overflowY: "auto",
          height: "90vh",
          flex: 2,
          mr: { md: "5px" },
        }}
      >
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
}

export default SearchFeed;
