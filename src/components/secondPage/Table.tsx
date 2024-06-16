import { Box } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Table = () => {
  return (
    <div className="h-[50px] flex items-center justify-center my-2">
      <MenuIcon className="cursor-pointer hover:opacity-60" />
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "white",
          border: "2px solid rgb(251 146 60)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <span className="max-[500px]:text-[12px] max-[390px]:text-[8px]">
          テストテスト
        </span>
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "white",
          border: "2px solid rgb(251 146 60)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <span className="max-[500px]:text-[12px] max-[390px]:text-[12px]">
          テストテスト
        </span>
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "white",
          border: "2px solid rgb(251 146 60)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <span className="max-[500px]:text-[12px] max-[390px]:text-[16px]">
          テストテスト
        </span>
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "white",
          border: "2px solid rgb(251 146 60)",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <span className="max-[500px]:text-[12px] max-[390px]:text-[12px]">
          テストテスト
        </span>
      </Box>
    </div>
  );
};

export default Table;
