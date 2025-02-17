import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Home = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/getFiles`)
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileClick = async (fileKey) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/download/${fileKey}`
      );
      const { url } = await response.json();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching signed URL:", error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Your Files
      </Typography>

      <Divider sx={{ my: 2 }} />

      <List>
        {files.map((file) => (
          <ListItem
            key={file.id}
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0" },
              borderBottom: "1px solid #ddd",
              borderRadius: "8px",
              px: 2,
            }}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleFileClick(file.id)}>
                <OpenInNewIcon />
              </IconButton>
            }
          >
            <ListItemText primary={file.filename} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Home;
