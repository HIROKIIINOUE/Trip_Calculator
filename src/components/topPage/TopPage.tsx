import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/storeType";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewTripSetUpPage from "./NewTripSetUpPage";
import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import ExampleTrip from "./ExampleTrip";
import GetStarted from "./GetStarted";
import { TripType } from "../../type/TripType";
import Trip from "./Trip";
import { getTripList } from "../../slices/tripSlice";
import MenuButton from "../common/MenuButton";
import { userLoginJudge } from "../../util/userLoginJudge";
import { userURLJudge } from "../../util/userURLJudge";
import { attachUserDocumentID } from "../../util/attachUserDocumentID";
import { useFetchCurrency } from "../../hooks/useFetchCurrency";

const TopPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const tripList = useAppSelector((state) => state.trip.trip);
  const [newTripSetUpPage, setNewTripSetUpPage] = useState<boolean>(false);
  const [exampleTrip, setExampleTrip] = useState<boolean>(false);
  const { userName } = useParams();

  // APIを叩いて通貨レート情報を取得
  useFetchCurrency(user, userName, navigate);

  useEffect(() => {
    // URLの「/:userName」を手打ちした時、「ログインしていない」もしくは「手打ちしたURLがログインしているユーザ情報と一致しない」時は自動でログイン画面に遷移され、attachUserDocumentID以降の処理は実行されない。(ログインしている場合はログイン画面→トップページへと遷移される)
    const userJudge = userLoginJudge(user, navigate);
    const URLJudge = userURLJudge(user, navigate, userName);
    if (!userJudge || !URLJudge) {
      return;
    }

    // URLが適正の場合以下から文末までを実行
    attachUserDocumentID(user, dispatch);

    if (userDocumentID) {
      const collectionRef: CollectionReference<DocumentData, DocumentData> =
        collection(db, "dataList", String(userDocumentID), "tripList");
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
          dispatch(getTripList(results));
          const JSONTripList = JSON.stringify(results);
          localStorage.setItem("tripList", JSONTripList);

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
              <div className="h-full md:w-[60%] w-[95%] mx-auto">
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
                    <MenuButton topPage={true} />
                  </div>
                </div>
                {exampleTrip && <ExampleTrip />}
                {tripList?.map((trip: TripType) => (
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
