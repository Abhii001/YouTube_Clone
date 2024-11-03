import { Stack, Button, Typography } from "@mui/material";
import { categories } from "../utils/constants";

function Sidebar({ selectedCategory, setSelectedCategory }) {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: {
          xs: "auto",
          md: "95%",
        },
        flexDirection: { md: "column" },
        padding: { xs: "1rem", md: "0" },
      }}
    >
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          sx={{
            justifyContent: "flex-start",
            backgroundColor: category.name === selectedCategory ? "#282828" : "transparent",
            color: "#f1f1f1",
            width: "100%",
            borderRadius: "8px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#444444",
            },
          }}
        >
          <span style={{ marginRight: "5px" }}>{category.icon}</span>
          <Typography variant="body1">{category.name}</Typography>
        </Button>
      ))}
    </Stack>
  );
}

export default Sidebar;
