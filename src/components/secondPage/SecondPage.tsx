// 次回ココから：secondPageのプラスボタンを押したらテーブル作成ページが出現するように作成。

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableHeader from "./TableHeader";
import Table from "./Table";
import { useAppSelector } from "../../app/storeType";
import Header from "../common/Header";
import {
  DocumentData,
  DocumentReference,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

const SecondPage = () => {
  const { tripId } = useParams();
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const [tripData, setTripData] = useState<any>([]);
  const [tripID, setTripID] = useState<string>("");

  // 自分用：URLパラメータと一致する1つのtripデータを取得する。
  useEffect(() => {
    const collectionRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "dataList",
      String(userDocumentID),
      "tripList",
      String(tripId)
    );

    const getTripDataFromDatabase = onSnapshot(collectionRef, (doc) => {
      setTripData(doc.data());
      setTripID(doc.id);
    });

    return () => getTripDataFromDatabase();
  }, []);

  return (
    <>
      <Header />
      <div className="h-screen bg-orange-300 md:p-3 p-1">
        <div className="bg-orange-300 pb-8 h-auto">
          <div className="md:flex mb-6">
            <div className="md:w-[46%] w-full">
              <p>タイトル</p>
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "rgb(255 237 213)",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  width: "100%",
                  borderRadius: "8px",
                  border: "double",
                  borderColor: "rgb(154 52 18)",
                }}
              >
                {tripData.title}
              </Box>
            </div>
            <div className="md:w-[56%] w-full flex">
              <div className="w-[33%]">
                <p>予算</p>
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "rgb(255 237 213)",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: "100%",
                    borderRadius: "8px",
                    border: "double",
                    borderColor: "rgb(154 52 18)",
                  }}
                >
                  {tripData.budget}
                </Box>
              </div>
              <div className="w-[33%]">
                <p>合計</p>
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "rgb(255 237 213)",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: "100%",
                    borderRadius: "8px",
                    border: "double",
                    borderColor: "rgb(154 52 18)",
                  }}
                >
                  (仮)58,400
                </Box>
              </div>
              <div className="w-[33%]">
                <p>差分</p>
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "rgb(255 237 213)",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: "100%",
                    borderRadius: "8px",
                    border: "double",
                    borderColor: "rgb(154 52 18)",
                  }}
                >
                  (仮)80,000
                </Box>
              </div>
            </div>
          </div>
          <TableHeader />
          <Table />
          <Table />
          <Table />
          <Table />
        </div>
      </div>
    </>
  );
};

export default SecondPage;
