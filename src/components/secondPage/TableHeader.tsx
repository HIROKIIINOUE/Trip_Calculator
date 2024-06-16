import { Box } from "@mui/material";
import React from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const TableHeader = () => {
  return (
    <div className="h-[50px] flex items-center justify-center">
      <AddCircleTwoToneIcon className="cursor-pointer hover:opacity-60" />
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "#F3FFD8",
          border: "4px double rgb(251 146 60)",
          textAlign: "center",
          fontSize: "20px",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        日付
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "#F3FFD8",
          border: "4px double rgb(251 146 60)",
          textAlign: "center",
          fontSize: "20px",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        金額
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "#F3FFD8",
          border: "4px double rgb(251 146 60)",
          textAlign: "center",
          fontSize: "20px",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        通貨
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "#F3FFD8",
          border: "4px double rgb(251 146 60)",
          textAlign: "center",
          fontSize: "20px",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        円
      </Box>
    </div>
  );
};

export default TableHeader;
