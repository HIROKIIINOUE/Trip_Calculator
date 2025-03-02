import { NavigateFunction } from "react-router-dom";
import { UserType } from "../type/UserType";

//  ↓ユーザーがログインしてない場合はログイン画面へ遷移
// Redirect to a login page if user doesn't login 
export const userLoginJudge = (user: UserType, navigate: NavigateFunction) => {
  if (!user) {
    navigate("/");
    return false;
  }
  return true;
};
