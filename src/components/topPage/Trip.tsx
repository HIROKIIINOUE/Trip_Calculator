// 次回ココから：Tripコンポーネントの横に削除マークを設置し、削除機能の実装。map展開しているコンポーネントにkeyプロップスを追加しコンソールのエラーメッセージを削除

import { Box } from "@mui/material";
import React from "react";
import { TripType } from "../../type/TripType";
import { useAppSelector } from "../../app/storeType";
import { topPageDescription } from "../../data/translatedDescriptionData";

type Props = {
  trip: TripType;
};

const Trip = (props: Props) => {
  const { trip } = props;

  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = topPageDescription;

  return (
    <div className="mt-8">
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgb(255 237 213)",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          borderRadius: "8px",
          border: "solid 2px",
          borderColor: "rgb(251 146 60)",
          cursor: "pointer",
          marginBottom: "18px",
          boxShadow: "4px 4px 15px -5px #777777",
          "&:hover": {
            opacity: "0.7",
          },
        }}
      >
        <div className="h-full w-full">
          <h2 className="h-[40%] w-full text-[24px] bg-orange-100 text-center rounded-xl">
            {trip.title}
          </h2>
          <div className="h-[60%] w-full flex  font-bold">
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][2]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {trip.yourCurrency}
              </p>
            </div>
            <div className="h-hull w-[34%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][4]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {trip.budget}
              </p>
            </div>
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][6]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {trip.startDay}
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Trip;
