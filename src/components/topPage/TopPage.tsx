// 次回ココから：onSnapshotのエラー修正完了したが、理解が追い付いていない。
// →以下のコードの修正ごと修正前を比較しながら理解する
// →理解が完了してから次に進むこと(useEffectの第二引数の理解も必ずすること)

import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/storeType";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewTripSetUpPage from "./NewTripSetUpPage";
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { fetchData } from "../../api/exchangeRateAPI";
import {
  setCurrencyNameList,
  setCurrencyRateList,
} from "../../slices/currencySlice";
import ExampleTrip from "./ExampleTrip";
import { attachDocumentID } from "../../slices/userSlice";
import GetStarted from "./GetStarted";
import { TripType } from "../../type/TripType";
import Trip from "./Trip";
import ReorderIcon from "@mui/icons-material/Reorder";

const TopPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const [newTripSetUpPage, setNewTripSetUpPage] = useState<boolean>(false);
  const [tripList, setTripList] = useState<any[]>([]);
  const [exampleTrip, setExampleTrip] = useState<boolean>(true);

  // ↓↓ログインしているuser情報のfirebase上にあるドキュメントIDを取得し、reduxで管理↓↓
  const attachUserDocumentID = async () => {
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(db, "dataList");
    const q = query(collectionRef, where("user.uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return;
    }

    querySnapshot.docs.forEach((doc) => {
      dispatch(attachDocumentID(doc.id));
    });
  };
  // ↑↑ここまで↑↑

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    attachUserDocumentID();

    // 自分用:api/exchangeRateAPI.ts からAPI関数を叩く
    // →「通貨レートデータ」と「通貨名リストデータ」をreduxで保存
    const getExchangeRateData = async (): Promise<void> => {
      const data = await fetchData();
      const currencyRateList = data[0].conversion_rates;
      const currencyNameList = Object.keys(currencyRateList);
      dispatch(setCurrencyRateList(currencyRateList));
      dispatch(setCurrencyNameList(currencyNameList));
    };
    getExchangeRateData();
  }, []);

  // ===========↓after=================
  useEffect(() => {
    if (userDocumentID) {
      const collectionRef = collection(
        db,
        "dataList",
        String(userDocumentID),
        "tripList"
      );
      const collectionRefOrderBy = query(
        collectionRef,
        orderBy("startDay", "desc")
      );

      const getTripDataListFromDatabase = onSnapshot(
        collectionRefOrderBy,
        (querySnapshot) => {
          const results: TripType[] = [];
          querySnapshot.docs.forEach((doc) => {
            results.push({
              title: doc.data().title,
              yourCurrency: doc.data().yourCurrency,
              budget: doc.data().budget,
              startDay: doc.data().startDay,
              id: doc.id,
            });
          });
          setTripList(results);
          if (!results.length) {
            setExampleTrip(true);
          } else {
            setExampleTrip(false);
          }
        }
      );

      // クリーンアップ関数を返すことで、コンポーネントのアンマウント時にリスナーを解除
      return () => getTripDataListFromDatabase();
    }
  }, [userDocumentID]);
  // ===========↑after=================

  const toNewTripSetUpPage = () => {
    setNewTripSetUpPage(true);
  };

  return (
    <>
      <Header />
      {userDocumentID ? (
        <>
          <div className="h-screen bg-orange-300">
            <div className="bg-orange-300 py-10 h-auto">
              <div className="h-full sm:w-[60%] w-[95%] mx-auto">
                <div className="flex">
                  <Box
                    sx={{
                      display: "flex",
                      backgroundColor: "rgb(255 237 213)",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60px",
                      width: "95%",
                      borderRadius: "8px",
                      border: "solid",
                      borderColor: "rgb(251 146 60)",
                      cursor: "pointer",
                      boxShadow: "4px 4px 15px -5px #777777",
                      "&:hover": {
                        opacity: "0.7",
                      },
                    }}
                    onClick={toNewTripSetUpPage}
                  >
                    <AddCircleOutlineIcon
                      style={{ fontSize: "32px", color: "rgb(194 65 12)" }}
                    />
                  </Box>
                  <div className="width-[5%] flex items-center justify-center ml-2">
                    <ReorderIcon className="hover:cursor-pointer hover:opacity-40" />
                  </div>
                </div>
                {exampleTrip && <ExampleTrip />}
                {tripList.map((trip) => (
                  <Trip trip={trip} key={trip.id} />
                ))}
              </div>
            </div>
          </div>
          <NewTripSetUpPage
            setNewTripSetUpPage={setNewTripSetUpPage}
            newTripSetUpPage={newTripSetUpPage}
          />
        </>
      ) : (
        <GetStarted />
      )}
    </>
  );
};

export default TopPage;
