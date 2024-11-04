import React, { useState } from "react";
import { Box } from "@mui/material";
import MenuButton from "../common/MenuButton";
import Detail from "./Detail";

type Props = {
  // ココany型修正
  tableData: any;
  tripId: string | undefined;
};

const Table = (props: Props) => {
  const { tableData, tripId } = props;
  const [displayDetail, setDisplayDetail] = useState<boolean>(false);

  return (
    <div className="h-[50px] flex items-center justify-center my-2">
      <MenuButton
        setDisplayDetail={setDisplayDetail}
        tableData={tableData}
        tripId={tripId}
      />
      <Box
        sx={{
          width: "30%",
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
          {tableData.date.replaceAll("-", "/")}
        </span>
      </Box>
      <Box
        sx={{
          width: "40%",
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
          {tableData.money.toLocaleString()}
          <span className="max-[500px]:text-[12px] max-[390px]:text-[16px] ml-1">
            ({tableData.currency})
          </span>
        </span>
      </Box>

      <Box
        sx={{
          width: "30%",
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
          {tableData.moneyResult.toLocaleString()}
        </span>
      </Box>
      {displayDetail && (
        <Detail setDisplayDetail={setDisplayDetail} tableData={tableData} />
      )}
    </div>
  );
};

export default Table;
