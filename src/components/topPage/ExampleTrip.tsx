import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../../app/storeType";
import { topPageDescription } from "../../localData/translatedDescriptionData";
import DeleteIcon from "@mui/icons-material/Delete";

const ExampleTrip = () => {
  const language = useAppSelector((state) => state.language.language);
  // 【any型】ココのany型直す
  const translatedData: any = topPageDescription;

  return (
    <div className="mt-8 flex">
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgb(255 237 213)",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "95%",
          borderRadius: "8px",
          border: "solid 2px",
          borderColor: "rgb(251 146 60)",
          marginBottom: "18px",
          boxShadow: "4px 4px 15px -5px #777777",
        }}
      >
        <div className="h-full w-full">
          <h2 className="h-[40%] w-full text-[24px] bg-orange-100 text-center rounded-xl">
            ({translatedData[language][0]}){translatedData[language][1]}
          </h2>
          <div className="h-[60%] w-full flex  font-bold">
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][2]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {translatedData[language][3]}
              </p>
            </div>
            <div className="h-hull w-[34%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][4]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {translatedData[language][5]}
              </p>
            </div>
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][6]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {translatedData[language][7]}
              </p>
            </div>
          </div>
        </div>
      </Box>
      <div className="width-[5%] flex items-center justify-center ml-2">
        <DeleteIcon />
      </div>
    </div>
  );
};

export default ExampleTrip;
