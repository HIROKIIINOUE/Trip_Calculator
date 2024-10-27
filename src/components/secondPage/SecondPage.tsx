// 【修正】なぜかtripIdをtripIDに置き換えるとエラーになる。確認して全てをtripIDに置き換えること。
// 次回ココから：（仮）円の表示をyourCurrencyを使って書き直す。リファクトリングしたcalculationMoneyに不備がない確認

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

const SecondPage = () => {
  const { tripId } = useParams();
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  // ココ修正：any型
  const [tripData, setTripData] = useState<any>([]);
  const [yourCurrency, setYourCurrency] = useState<string>("");
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = secondPageDescription;
  const [newTableSetUpPage, setNewTableSetUpPage] = useState<boolean>(false);
  // ココ修正：any型
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const tripList = useAppSelector((state) => state.trip.trip);
  const [tableList, setTableList] = useState<any[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [upToBudget, setUpToBudget] = useState<number>(0);

  // 自分用：URLパラメータと一致する1つのtripデータを取得する。
  // 自分用：yourCurrencyのデータを取得する
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // =========================
    // 自分用：secondPage用のURLを手書きで変更した時、変更後のURLが既にデータベース上にあるtripデータのどのIDとも一致しない時、トップページに自動的に遷移する処理。
    // (さもないとURLから取得したパラムがデータベースのどれとも一致しないことでエラーが発生してしまう)
    // ↓ココany型修正
    const judgeTripExist = tripList.filter((trip: any) => {
      return trip.id === tripId;
    });
    if (judgeTripExist.length === 0) {
      navigate("/");
      return;
    }
    // =========================

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
                  {sum} ({yourCurrency})
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
                  {upToBudget}
                </Box>
              </div>
            </div>
          </div>
          <TableHeader
            setNewTableSetUpPage={setNewTableSetUpPage}
            yourCurrency={yourCurrency}
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
          yourCurrency={yourCurrency}
        />
      )}
    </>
  );
};

export default SecondPage;
