import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAppSelector } from "../../app/storeType";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../common/LoadingPage";
import { getStartedDescription } from "../../localData/translatedDescriptionData";

const GetStarted = () => {
  const translatedData: any = getStartedDescription;
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.user);
  const language = useAppSelector((state) => state.language.language);
  const navigate = useNavigate();

  // 自分用：onSnapshot()じゃなくてgetDoc()を使うことで毎回データベースと通信を行う
  // →データベース上にuser情報があるかどうかを正しいタイミングでジャッジできる。
  // →ページがリフレッシュされても重複したuser情報がデータベースに保存されなくなる。
  const createDatabase = async () => {
    setLoadingPage(true);
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(db, "dataList");

    const q = query(collectionRef, where("user.uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);

    // ログインしているユーザ情報がDB上に無ければ(emptyならば)、DBにドキュメントを追加する
    if (querySnapshot.empty) {
      await addDoc(collectionRef, {
        user: user,
      });
    }
    navigate("/");
    setLoadingPage(false);
  };

  return (
    <>
      {loadingPage && <LoadingPage />}
      <div className="h-screen bg-orange-300">
        <div className="bg-orange-300 py-10 h-auto">
          <div className="h-full sm:w-[60%] w-[95%] mx-auto">
            <Box
              sx={{
                display: "flex",
                backgroundColor: "rgb(255 237 213)",
                justifyContent: "center",
                alignItems: "center",
                height: "80px",
                borderRadius: "8px",
                border: "solid",
                borderColor: "rgb(251 146 60)",
                cursor: "pointer",
                boxShadow: "4px 4px 15px -5px #777777",
                "&:hover": {
                  opacity: "0.7",
                },
              }}
              onClick={createDatabase}
            >
              <p className="text-[40px] text-orange-600">
                {translatedData[language][0]}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
