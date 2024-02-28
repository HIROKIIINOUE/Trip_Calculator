import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/storeType";
import { auth } from "./firebase";
import { login, logout } from "./slices/userSlice";
import LoginPage from "./components/loginPage/LoginPage";

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

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
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  

  return <>{user ? <div>App</div> : <LoginPage />}</>;
};

export default App;
