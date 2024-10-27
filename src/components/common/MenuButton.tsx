import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { db } from "../../firebase";
import { useAppSelector } from "../../app/storeType";
import { deleteDoc, doc } from "firebase/firestore";

type Props = {
  setDisplayDetail: React.Dispatch<React.SetStateAction<boolean>>;
  tableData: any; //←ココのany型修正
  tripId: string | undefined;
};

const MenuButton = (props: Props) => {
  const { tableData, tripId } = props;
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const { setDisplayDetail } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 自分用：テーブルの詳細情報を表示
  const handleDetail = () => {
    setDisplayDetail(true);
    setAnchorEl(null);
  };

  // 自分用：テーブルデータをfirebaseデータベースから削除
  const handleDelete = async () => {
    if (
      !window.confirm(
        `${tableData.date}の${tableData.money}${tableData.currency}を削除しますか？`
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
      String(tableData.id)
    );
    await deleteDoc(documentRef);
    // ココ修正
    // window.location.reload()
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
              opacity: "0.7",
            },
          }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDetail}>詳細</MenuItem>
        <MenuItem onClick={handleDelete}>削除</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;
