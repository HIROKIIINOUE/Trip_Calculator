import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/storeType";
import { Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewTripSetUpPage from "./NewTripSetUpPage";
import {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  CurrentUserInformationInDatabase,
  UserInformation,
} from "../../type/UserType";

const TopPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = {
    japanese: [
      "例",
      "日本旅行",
      "通貨",
      "YEN",
      "予算",
      "50,000",
      "開始日",
      "2024/04/29",
    ],
    english: [
      "ex",
      "Japan trip",
      "currency",
      "YEN",
      "budget",
      "50,000",
      "start",
      "29/04/2024",
    ],
    french: [
      "ex",
      "Voyage au Japon",
      "devise",
      "YEN",
      "budget",
      "50,000",
      "commence",
      "29/04/2024",
    ],
  };

  const [newTripSetUpPage, setNewTripSetUpPage] = useState<boolean>(false);
  const [userInfoListInDatabase, setUserInfoListInDatabase] = useState<any[]>(
    []
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const toNewTripSetUpPage = async (): Promise<void> => {
    setNewTripSetUpPage(true);

    // 自分用：↓User情報をdatabase上に作成。もし既にあればスキップ
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "dataList"
    );

    // 自分用：↓databaseから既存のuser情報を取得
    onSnapshot(collectionRef, (QuerySnapshot) => {
      const results: CurrentUserInformationInDatabase[] = [];
      QuerySnapshot.docs.forEach((doc) => {
        results.push({
          uid: doc.data().user?.uid,
          ID: doc.id,
        });
      });
      setUserInfoListInDatabase(results);
    });

    // 自分用：↓現在のログイン情報がdatabase上に既にあるかどうかチェック
    const judge: string[] = userInfoListInDatabase.map((userInfo) => {
      if (userInfo.uid === user?.uid) {
        return userInfo.uid;
      }
    });

    // 自分用：ログインしているuser情報がdatabase上に無い場合のみdatabaseに追加
    if (!judge[0]) {
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
                    ({translatedData[language][0]}){" "}
                    {translatedData[language][1]}
                  </h2>
                  <div className="h-[60%] w-full flex  font-bold">
                    <div className="h-hull w-[33%] px-2">
                      <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                        {translatedData[language][2]}
                      </p>
                      <p className="h-[50%] flex items-center justify-center">
                        {translatedData[language][3]}
                      </p>
                    </div>
                    <div className="h-hull w-[34%] px-2">
                      <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                        {translatedData[language][4]}
                      </p>
                      <p className="h-[50%] flex items-center justify-center">
                        {translatedData[language][5]}
                      </p>
                    </div>
                    <div className="h-hull w-[33%] px-2">
                      <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                        {translatedData[language][6]}
                      </p>
                      <p className="h-[50%] flex items-center justify-center">
                        {translatedData[language][7]}
                      </p>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
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
