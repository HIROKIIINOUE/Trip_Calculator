// 【修正】なぜかtripIdをtripIDに置き換えるとエラーになる。確認して全てをtripIDに置き換えること。
// 次回ココから：（仮）円の表示をyourCurrencyを使って書き直す。リファクトリングしたcalculationMoneyに不備がない確認

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
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { secondPageDescription } from "../../localData/translatedDescriptionData";
import NewTableSetUpPage from "./NewTableSetUpPage";

const SecondPage = () => {
  const { tripId } = useParams();
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const [tripData, setTripData] = useState<any>([]);
  const [yourCurrency, setYourCurrency] = useState<string>("");
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = secondPageDescription;
  const [newTableSetUpPage, setNewTableSetUpPage] = useState<boolean>(false);

  // 自分用：URLパラメータと一致する1つのtripデータを取得する。
  // 自分用：yourCurrencyのデータを取得する
  useEffect(() => {
    const collectionRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "dataList",
      String(userDocumentID),
      "tripList",
      String(tripId)
    );

    const getYourCurrency = async () => {
      const querySnapshot = await getDoc(collectionRef);
      setYourCurrency(querySnapshot.data()!.yourCurrency);
    };
    getYourCurrency();

    const getTripDataFromDatabase = onSnapshot(collectionRef, (doc) => {
      setTripData(doc.data());
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
              <p>{translatedData[language][0]}</p>
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
                <p>{translatedData[language][1]}</p>
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
                <p>{translatedData[language][2]}</p>
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
                <p>{translatedData[language][3]}</p>
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
          <TableHeader
            setNewTableSetUpPage={setNewTableSetUpPage}
            yourCurrency={yourCurrency}
          />
          <Table />
          <Table />
          <Table />
          <Table />
        </div>
      </div>
      {newTableSetUpPage && (
        <NewTableSetUpPage
          setNewTableSetUpPage={setNewTableSetUpPage}
          yourCurrency={yourCurrency}
        />
      )}
    </>
  );
};

export default SecondPage;
