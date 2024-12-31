import { NavigateFunction } from "react-router-dom";
import { UserType } from "../type/UserType";

//  ↓ユーザーがログインしてない場合はログイン画面へ遷移
export const userLoginJudge = (user: UserType, navigate: NavigateFunction) => {
  if (!user) {
    navigate("/");
    return false;
  }
  return true;
};
