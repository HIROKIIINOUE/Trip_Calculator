import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import Header from "../common/Header";
import { useAppDispatch, useAppSelector } from "../../app/storeType";
import { login, logout } from "../../slices/userSlice";
import { useNavigate } from "react-router";
import LoadingPage from "../common/LoadingPage";
import { loginPageDescription } from "../../localData/translatedDescriptionData";
import { cleanUpLocalStorageExceptLanguage } from "../../util/cleanUpLocalstorage";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const language = useAppSelector((state) => state.language.language);
  // 【any】↓ここの型直し
  const translatedData: any = loginPageDescription;

  const logIn = async () => {
    cleanUpLocalStorageExceptLanguage();
    setLoadingPage(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error);
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
        const JSONLoginUser = JSON.stringify(loginUser);
        localStorage.setItem("user", JSONLoginUser);
        navigate(`/user=${loginUser.email}`);
      } else {
        dispatch(logout());
        navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <>
      {loadingPage && <LoadingPage />}
      <div className="h-screen bg-orange-200">
        <Header />
        <div className="absolute top-[220px] right-0 left-0 sm:w-[500px] w-[300px] h-[240px] mx-auto">
          <div className="text-center font-serif">
            <h1 className="md:text-[36px] text-[30px]">~ Trip Calculator ~</h1>
          </div>
          <div className="h-[68px]  bg-orange-100 flex items-center p-2 rounded mt-4 drop-shadow-2xl">
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
              <span className="capitalize md:text-[20px] text-[16px]">
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
