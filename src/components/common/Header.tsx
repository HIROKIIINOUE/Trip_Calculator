import React, { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "../../app/storeType";
import { auth } from "../../firebase";
import LanguageOption from "./LanguageOption";

const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const [languageOptionPage, setLanguageOptionPage] = useState<boolean>(false);

  const logout = (): void => {
    if (!window.confirm("ログアウトしますか？")) {
      return;
    }
    auth.signOut();
    // window.location.reload()
  };

  const toLanguageOption = () => {
    setLanguageOptionPage(true);
  };

  return (
    <div className="h-[60px] w-full bg-orange-400 flex justify-end">
      <div className="lg:w-[25%] sm:w-[35%] w-full h-[60px] flex items-center">
        {user ? (
          <div
            onClick={logout}
            className="w-[50%] h-full gap-1 flex items-center justify-center hover:bg-orange-300 cursor-pointer duration-700"
          >
            <LogoutIcon />
            <p>ログアウト</p>
          </div>
        ) : (
          <p className="w-[50%] h-full"></p>
        )}
        <div
          onClick={toLanguageOption}
          className="w-[50%] h-full gap-1 flex items-center justify-center hover:bg-orange-300 cursor-pointer duration-700"
        >
          <LanguageIcon />
          <p className="font-bold">Language</p>
        </div>
      </div>
      {languageOptionPage && (
        <LanguageOption
          languageOptionPage={languageOptionPage}
          setLanguageOptionPage={setLanguageOptionPage}
        />
      )}
    </div>
  );
};

export default Header;
