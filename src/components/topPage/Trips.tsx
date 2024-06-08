import { Box } from "@mui/material";
import React from "react";

const Trips = () => {
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
            aaaaaaa
          </h2>
          <div className="h-[60%] w-full flex  font-bold">
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                bbbbbbbbbbbb
              </p>
              <p className="h-[50%] flex items-center justify-center">
                tttttttttttttt
              </p>
            </div>
            <div className="h-hull w-[34%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                tttttttttttttt
              </p>
              <p className="h-[50%] flex items-center justify-center">
                nnnnnnnn
              </p>
            </div>
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                nnnnnnnn
              </p>
              <p className="h-[50%] flex items-center justify-center">
                nnnnnnnn
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Trips;
