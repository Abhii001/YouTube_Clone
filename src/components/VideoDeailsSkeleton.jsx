import { Skeleton, Box, Stack } from "@mui/material";

const VideoDetailsSkeleton = () => {
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }} sx={{ p: "1.5rem" }}>
        <Box flex={1}>
          <Box
            sx={{ width: "100%", position: "sticky", top: "86px", zIndex: 1 }}
          >
            {/* Main video skeleton */}
            <Skeleton
              sx={{ bgcolor: "#282828" }}
              variant="rectangular" // Corrected the typo here
              width="80%"
              height="400px"
            />
            {/* Title and description skeletons */}
            <Skeleton sx={{ bgcolor: "#282828", mt: 2 }} width="80%" variant="text" />
            <Skeleton sx={{ bgcolor: "#282828", mt: 1 }} width="80%" variant="text" />
            <Skeleton sx={{ bgcolor: "#282828", mt: 1 }} width="80%" variant="text" />
            {/* Additional skeletons for views and likes */}
            <Skeleton sx={{ bgcolor: "#282828", mt: 2 }} width="30%" variant="text" />
            <Skeleton sx={{ bgcolor: "#282828", mt: 1 }} width="20%" variant="text" />
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
          {/* Placeholder for related videos or comments */}
          <Skeleton variant="rectangular" width="100%" height="250px" />
          <Skeleton variant="text" width="80%" sx={{ bgcolor: "#282828", mt: 1 }} />
          <Skeleton variant="text" width="80%" sx={{ bgcolor: "#282828", mt: 1 }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetailsSkeleton;
