import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { auth, db } from "../../firebase";
import { useAppSelector } from "../../app/storeType";
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
} from "firebase/firestore";
import { menuButtonDescription } from "../../localData/translatedDescriptionData";
import { logout } from "../../slices/userSlice";
import { cleanUpLocalStorageExceptLanguage } from "../../util/cleanUpLocalstorage";
import { TableType } from "../../type/TableType";

type Props = {
  setDisplayDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  tableData?: TableType;
  tableList?: TableType[];
  tripId?: string | undefined;
  topPage: boolean; //←トップページのメニューボタンかセカンドページのメニューボタンかを判断
};

const MenuButton = (props: Props) => {
  const { setDisplayDetail, tableData, tableList, tripId, topPage } = props;
  const translatedData: any = menuButtonDescription;
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const language = useAppSelector((state) => state.language.language);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 自分用：トップページ、旅行情報全削除
  const handleDeleteAllTrip = async () => {
    if (!window.confirm(translatedData[language][2])) {
      setAnchorEl(null);
      return;
    }
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(db, "dataList", String(userDocumentID), "tripList");
    const querySnapshot = await getDocs(collectionRef);

    // querySnapshotで集めたdocumentデータの配列を非同期処理で1つずつ削除していく
    // eslint-disable-next-line array-callback-return
    const deletePromise = querySnapshot.docs.map((item) => {
      const documentRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "dataList",
        String(userDocumentID),
        "tripList",
        String(item.id)
      );
      deleteDoc(documentRef);
    });

    await Promise.all(deletePromise);

    setAnchorEl(null);
  };

  // 自分用：トップページ、ユーザアカウント情報削除
  const handleDeleteUserData = async () => {
    if (!window.confirm(translatedData[language][3])) {
      setAnchorEl(null);
      return;
    }
    const documentRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "dataList",
      String(userDocumentID)
    );
    await deleteDoc(documentRef);
    auth.signOut();
    logout();
    cleanUpLocalStorageExceptLanguage();
    setAnchorEl(null);
  };

  // セカンドページ、指定したテーブルの詳細情報を表示
  const handleDetail = () => {
    if (setDisplayDetail) {
      setDisplayDetail(true);
    }
    setAnchorEl(null);
  };

  // セカンドページ、指定したテーブルデータをfirebaseデータベースから削除
  const handleDelete = async () => {
    if (
      !window.confirm(
        `${tableData?.date} / ${tableData?.money}${tableData?.currency}  ${translatedData[language][6]}？`
      )
    ) {
      setAnchorEl(null);
      return;
    }

    const documentRef = doc(
      db,
      "dataList",
      String(userDocumentID),
      "tripList",
      String(tripId),
      "tableList",
      String(tableData?.id)
    );
    await deleteDoc(documentRef);

    // 最後1つのテーブルを削除した時のみ、削除後もテーブルがページ内に表示されてしまう。
    // →最後のテーブル削除時のみ以下の処理を実行
    if (tableList?.length === 1) {
      window.location.reload();
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          minWidth: "auto",
          padding: 0,
          width: "fit-content",
          "& .MuiButton-startIcon": {
            margin: 0,
          },
        }}
      >
        <MenuIcon
          sx={{
            color: "black",
            "&:hover": {
              opacity: "0.5",
            },
          }}
        />
      </Button>
      {topPage ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDeleteAllTrip}>
            {translatedData[language][0]}
          </MenuItem>
          <MenuItem onClick={handleDeleteUserData}>
            {translatedData[language][1]}
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDetail}>
            {translatedData[language][4]}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            {translatedData[language][5]}
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default MenuButton;
