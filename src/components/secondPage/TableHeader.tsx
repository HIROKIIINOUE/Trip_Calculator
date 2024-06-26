import { Box } from "@mui/material";
import React from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import { useAppSelector } from "../../app/storeType";
import { secondPageDescription } from "../../localData/translatedDescriptionData";

type Props = {
  setNewTableSetUpPage: React.Dispatch<React.SetStateAction<boolean>>;
  yourCurrency: string;
};

const TableHeader = (props: Props) => {
  const { setNewTableSetUpPage, yourCurrency } = props;
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = secondPageDescription;

  const toNewTableSetUpPage = () => {
    setNewTableSetUpPage(true);
  };

  return (
    <div className="h-[50px] flex items-center justify-center">
      <AddCircleTwoToneIcon
        className="cursor-pointer hover:opacity-60"
        onClick={toNewTableSetUpPage}
      />
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
        {yourCurrency}
      </Box>
    </div>
  );
};

export default TableHeader;
