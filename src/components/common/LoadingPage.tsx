import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white opacity-90">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoadingPage;
