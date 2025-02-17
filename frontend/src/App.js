import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
