import React, { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "../../app/storeType";
import { auth } from "../../firebase";
import LanguageOption from "./LanguageOption";
import { headerDescription } from "../../localData/translatedDescriptionData";
import { logout } from "../../slices/userSlice";

const Header = () => {
  const user = useAppSelector((state) => state.user.user);
  const [languageOptionPage, setLanguageOptionPage] = useState<boolean>(false);
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = headerDescription;

  const handleLogout = (): void => {
    if (!window.confirm(`${translatedData[language][1]}`)) {
      return;
    }
    auth.signOut();
    logout();
    localStorage.clear();
  };

  const toLanguageOption = () => {
    setLanguageOptionPage(true);
  };

  return (
    <div className="h-[100px] w-full bg-orange-400 flex justify-between">
      {user ? (
        <div className="h-full w-[40%]">
          <div className="h-[68px] w-[68px] ml-3">
            <img
              src={user?.photo}
              alt="user_image"
              className="h-full w-full mx-auto rounded-full p-1"
            />
            <p className="text-[12px] text-center">
              <span className="border-b-2 border-orange-100">
                {user.displayName}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="lg:w-[25%] sm:w-[35%] w-full h-full flex items-center">
        {user ? (
          <div
            onClick={handleLogout}
            className="w-[50%] h-full gap-1 flex items-center justify-center hover:bg-orange-300 cursor-pointer duration-700"
          >
            <LogoutIcon />
            <p className="font-bold">{translatedData[language][0]}</p>
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
