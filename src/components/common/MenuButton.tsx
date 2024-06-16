import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
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
        <MenuItem onClick={handleClose}>詳細</MenuItem>
        <MenuItem onClick={handleClose}>削除</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuButton;
