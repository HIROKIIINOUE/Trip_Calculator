import React from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import Header from "../common/Header";
import { useAppSelector } from "../../app/storeType";
// import { TranslatedData } from "../../type/LanguageType";

function LoginPage() {
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = {
    japanese: ["Googleでログインする"],
    english: ["login as google account"],
    french: ["French"],
  };

  const logIn = () => {
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="h-screen bg-orange-200">
        <Header />
        <div className="absolute top-[220px] right-0 left-0 mx-auto sm:w-[400px] w-[300px] h-[240px]">
          <div className="text-center font-serif">
            <h1 className="text-[36px]">~ Trip Calculator ~</h1>
          </div>
          <div className="bg-orange-100 flex items-center p-2 rounded mt-4 drop-shadow-2xl">
            <img
              src="./pictures/google_icon.png"
              alt="google"
              width={60}
              height={10}
              className="p-2"
            />
            <Button
              color="error"
              variant="contained"
              className="h-full grow"
              onClick={logIn}
            >
              <span className="capitalize sm:text-xl text-lg">
                {translatedData[language][0]}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
