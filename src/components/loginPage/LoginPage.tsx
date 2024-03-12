import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import Header from "../common/Header";
import { useAppDispatch, useAppSelector } from "../../app/storeType";
import { login, logout } from "../../slices/userSlice";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = {
    japanese: ["Googleでログインする"],
    english: ["login as google account"],
    french: ["Connectez-vous avec un compte Google"],
  };

  const logIn = () => {
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      alert(error);
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
        navigate(`/user=${loginUser.displayName}`);
      } else {
        dispatch(logout());
        navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <>
      <div className="h-screen bg-orange-200">
        <Header />
        <div className="absolute top-[220px] right-0 left-0 mx-auto sm:w-[400px] w-[300px] h-[240px]">
          <div className="text-center font-serif">
            <h1 className="md:text-[36px] text-[30px]">~ Trip Calculator ~</h1>
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
