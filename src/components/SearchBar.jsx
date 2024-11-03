import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) { // Prevents submitting empty search terms
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        border: "1px solid hsl(0, 0%, 18.82%)",
        borderRadius: 10,
        backgroundColor: "hsl(0, 0%, 7%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        className="search-bar"
        value={searchTerm}
        placeholder="Search.."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          backgroundColor: "transparent",
          padding: "10px",
          fontSize: ".9rem",
          color: "hsla(0, 100%, 100%, 0.88)",
          border: "none",
          outline: "none",
          flex: 1, // Allows the input to grow and fill available space
        }}
        aria-label="Search"
      />

      <IconButton type="submit" sx={{ padding: 0 }}>
        <Search
          sx={{
            color: "hsla(0, 100%, 100%, 0.48)",
          }}
          aria-label="Search"
        />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
