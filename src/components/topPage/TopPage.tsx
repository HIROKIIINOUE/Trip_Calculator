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
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { CurrentUserInformationInDatabase } from "../../type/UserType";
import { fetchData } from "../../api/exchangeRateAPI";
import {
  setCurrencyNameList,
  setCurrencyRateList,
} from "../../slices/currencySlice";
import { topPageDescription } from "../../data/translatedDescriptionData";
import ExampleTrip from "./ExampleTrip";
import Trips from "./Trips";

const TopPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [newTripSetUpPage, setNewTripSetUpPage] = useState<boolean>(false);
  const [userInfoListInDatabase, setUserInfoListInDatabase] = useState<any[]>(
    []
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

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

  // 自分用：onSnapshot()じゃなくてgetDoc()を使うことで毎回データベースと通信を行う
  // →データベース上にuser情報があるかどうかを正しいタイミングでジャッジできる。
  // →ページがリフレッシュされても重複したuser情報がデータベースに保存されなくなる。

  const toNewTripSetUpPage = async (): Promise<void> => {
    setNewTripSetUpPage(true);

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "dataList"
    );

    const q = query(collectionRef, where("user.uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);

    // 自分用：↓条件を絞って取得したドキュメントがなければ(emptyならば)、ドキュメントを追加する
    if (querySnapshot.empty) {
      await addDoc(collectionRef, {
        user: user,
      });
    }
  };

  return (
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
              onClick={toNewTripSetUpPage}
            >
              <AddCircleOutlineIcon
                style={{ fontSize: "32px", color: "rgb(194 65 12)" }}
              />
            </Box>
            <ExampleTrip />
            <Trips />
          </div>
        </div>
      </div>
      <NewTripSetUpPage
        setNewTripSetUpPage={setNewTripSetUpPage}
        newTripSetUpPage={newTripSetUpPage}
      />
    </>
  );
};

export default TopPage;
