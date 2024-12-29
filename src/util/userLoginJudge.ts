import { NavigateFunction } from "react-router-dom";

type User = {
  uid: string;
  photo: string;
  email: string;
  displayName: string;
} | null;

//  ↓ユーザーがログインしてない場合はログイン画面へ遷移
export const userLoginJudge = (user: User, navigate: NavigateFunction) => {
  if (!user) {
    navigate("/");
    return false;
  }
  return true;
};
