import React, { useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/uploadFiles`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("File uploaded successfully!");
        setSelectedFile(null);
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Upload a File
      </Typography>

      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Allowed formats: <strong>jpg, png, json, txt</strong>
      </Typography>

      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          accept=".jpg,.png,.json,.txt,.jpeg"
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<AttachFileIcon />}
          >
            {selectedFile ? selectedFile.name : "Choose File"}
          </Button>
        </label>
      </Box>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
      >
        {uploading ? <CircularProgress size={24} /> : "Upload"}
      </Button>
    </Paper>
  );
};

export default Upload;
