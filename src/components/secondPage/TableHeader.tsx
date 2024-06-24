import { Box } from "@mui/material";
import React from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { useAppSelector } from "../../app/storeType";
import { secondPageDescription } from "../../localData/translatedDescriptionData";

const TableHeader = () => {
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = secondPageDescription;

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
        {translatedData[language][4]}
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
        {translatedData[language][5]}
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
        {translatedData[language][6]}
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
        (仮)円
      </Box>
    </div>
  );
};

export default TableHeader;
