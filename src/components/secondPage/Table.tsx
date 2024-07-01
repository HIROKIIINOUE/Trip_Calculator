import React from "react";
import { Box } from "@mui/material";
import MenuButton from "../common/MenuButton";

type Props = {
  tableData: any;
};

const Table = (props: Props) => {
  const { tableData } = props;

  return (
    <div className="h-[50px] flex items-center justify-center my-2">
      <MenuButton />
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
          {tableData.date}
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
          {tableData.money.toLocaleString()}
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
          {tableData.currency}
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
          {tableData.moneyResult.toLocaleString()}
        </span>
      </Box>
    </div>
  );
};

export default Table;
