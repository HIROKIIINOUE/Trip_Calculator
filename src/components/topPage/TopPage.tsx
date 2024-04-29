import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/storeType";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewTripSetUpPage from "./NewTripSetUpPage";

const TopPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const [newTripSetUpPage, setNewTripSetUpPage] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {newTripSetUpPage ? (
        <>
          <NewTripSetUpPage />
        </>
      ) : (
        <>
          <Header />
          <div className="h-screen bg-orange-300">
            <div className="bg-orange-300 py-10 h-auto">
              <div className="h-full sm:w-[60%] w-[95%] mx-auto">
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "rgb(255 237 213)",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60px",
                    borderRadius: "8px",
                    border: "solid",
                    borderColor: "rgb(251 146 60)",
                    cursor: "pointer",
                    boxShadow: "4px 4px 15px -5px #777777",
                    "&:hover": {
                      opacity: "0.7",
                    },
                  }}
                  onClick={() => setNewTripSetUpPage(true)}
                >
                  <AddCircleOutlineIcon
                    style={{ fontSize: "32px", color: "rgb(194 65 12)" }}
                  />
                </Box>
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
                        日本旅行
                      </h2>
                      <div className="h-[60%] w-full flex">
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            自国通貨
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            円
                          </p>
                        </div>
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            現地通貨
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            ユーロ
                          </p>
                        </div>
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            予算
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            50,000円
                          </p>
                        </div>
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            開始日
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            30,000円
                          </p>
                        </div>
                      </div>
                    </div>
                  </Box>
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
                        日本旅行
                      </h2>
                      <div className="h-[60%] w-full flex">
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            自国通貨
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            円
                          </p>
                        </div>
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            現地通貨
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            ユーロ
                          </p>
                        </div>
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            予算
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            50,000円
                          </p>
                        </div>
                        <div className="h-hull w-[25%] p-1">
                          <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                            開始日
                          </p>
                          <p className="h-[50%] flex items-center justify-center">
                            30,000円
                          </p>
                        </div>
                      </div>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopPage;
