import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import TableHeader from "./TableHeader";
import Table from "./Table";
import { useAppSelector } from "../../app/storeType";
import Header from "../common/Header";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { secondPageDescription } from "../../localData/translatedDescriptionData";
import NewTableSetUpPage from "./NewTableSetUpPage";
import { userLoginJudge } from "../../util/userLoginJudge";
import { tripExistJudge } from "../../util/tripExistJudge";
import { TripType } from "../../type/TripType";
import { userURLJudge } from "../../util/userURLJudge";

const SecondPage = () => {
  const { userName, tripId } = useParams();
  const translatedData: any = secondPageDescription;
  const language = useAppSelector((state) => state.language.language);
  const user = useAppSelector((state) => state.user.user);
  const tripList = useAppSelector((state) => state.trip.trip);
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  // ココ修正：any型
  const [tripData, setTripData] = useState<any>([]);
  const [newTableSetUpPage, setNewTableSetUpPage] = useState<boolean>(false);
  const [tableList, setTableList] = useState<TripType[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [upToBudget, setUpToBudget] = useState<number>(0);
  const navigate = useNavigate();

  // トリップデータを取得
  useEffect(() => {
    const userJudge = userLoginJudge(user, navigate);
    const URLJudge = userURLJudge(user, navigate, userName);
    const tripJudge = tripExistJudge(tripList, tripId, navigate);
    if (!userJudge || !URLJudge || !tripJudge) {
      return;
    }

    const documentRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "dataList",
      String(userDocumentID),
      "tripList",
      String(tripId)
    );

    const getTripDataFromDatabase = onSnapshot(documentRef, (doc) => {
      setTripData(doc.data());
    });

    return () => getTripDataFromDatabase();
  }, []);

  // 自分用：テーブルデータ(各行のインプットデータ)を取得
  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(
        db,
        "dataList",
        String(userDocumentID),
        "tripList",
        String(tripId),
        "tableList"
      );
    const collectionRefOrderBy = query(collectionRef, orderBy("date", "desc"));

    const getTableDataListFromDatabase = onSnapshot(
      collectionRefOrderBy,
      (querySnapshot) => {
        // ココ修正：any型
        const results: any = [];
        querySnapshot.docs.forEach((doc) => {
          results.push({
            date: doc.data().date,
            currency: doc.data().currency,
            money: doc.data().money,
            moneyResult: doc.data().moneyResult,
            detail: doc.data().detail,
            id: doc.id,
          });
          setTableList(results);
        });
      }
    );

    return () => getTableDataListFromDatabase();
  }, []);

  // ↓リファクトリング対象
  // ↓自分用：自国通貨へ変換後の合計金額
  useEffect(() => {
    let sumUp: number = 0;
    tableList.forEach((table: any) => {
      sumUp += table.moneyResult;
    });
    setSum(sumUp);
  }, [tableList]);

  // tripデータから取得した「予算」から、tableListから取得した「使用合計金額」を差し引いた「差額」を算出
  useEffect(() => {
    // 自分用：tripデータから予算を取得(↓必ず文字列型になってしまう)
    const stringBudget = tripData.budget;
    let budget: string = "";
    if (stringBudget) {
      // 自分用：文字列型データからカンマを削除
      budget = stringBudget.replaceAll(",", "");
    }
    // 自分用：文字列型から数値型に変換
    const difference: number = Number(budget) - sum;
    setUpToBudget(difference);
  }, [tripData, sum]);

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
            <div className="md:w-[56%] w-full md:flex">
              <div className="md:w-[33%] w-full">
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
                    padding: "4px",
                  }}
                >
                  {tripData.budget} ({tripData.yourCurrency})
                </Box>
              </div>
              <div className="md:w-[67%] w-full flex break-words">
                <div className="w-[50%]">
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
                      padding: "4px",
                    }}
                  >
                    {sum.toLocaleString()} ({tripData.yourCurrency})
                  </Box>
                </div>
                <div className="w-[50%]">
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
                      padding: "4px",
                    }}
                  >
                    {upToBudget.toLocaleString()} ({tripData.yourCurrency})
                  </Box>
                </div>
              </div>
            </div>
          </div>
          <TableHeader
            setNewTableSetUpPage={setNewTableSetUpPage}
            yourCurrency={tripData.yourCurrency}
          />
          {tableList.map((tableData) => (
            // ↓keyを正しい値に直すこと（もしかしたらuuid?）
            <Table tableData={tableData} key={tableData.id} tripId={tripId} />
          ))}
        </div>
      </div>
      {newTableSetUpPage && (
        <NewTableSetUpPage
          setNewTableSetUpPage={setNewTableSetUpPage}
          yourCurrency={tripData.yourCurrency}
        />
      )}
    </>
  );
};

export default SecondPage;
