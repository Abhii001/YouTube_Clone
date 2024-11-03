import { Stack, Skeleton, Card, CardMedia, CardContent } from "@mui/material";

const CardSkeleton = ({ direction = "row" }) => {
  const skeletonCount = 6; // Number of skeletons to display

  return (
    <Stack
      direction={direction}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Card
          key={index}
          sx={{
            width: { xs: "100%", sm: "358px", md: "320px" },
            boxShadow: "none",
            borderRadius: 0,
            backgroundColor: "transparent",
          }}
        >
          <CardMedia>
            <Skeleton
              sx={{ bgcolor: "#282828" }}
              variant="rectangular" // Corrected from 'rectancular' to 'rectangular'
              width="100%"
              height="150px"
            />
          </CardMedia>

          <CardContent>
            <Skeleton sx={{ bgcolor: "#282828" }} variant="text" />
            <Skeleton sx={{ bgcolor: "#282828" }} variant="text" />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default CardSkeleton;
