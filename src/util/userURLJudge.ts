import { NavigateFunction } from "react-router-dom";
import { UserType } from "../type/UserType";

// ↓ログイン情報とURLパラメータが正しく一致しないとき、ログイン画面へ遷移
//   ※ログインしている場合は「ログイン画面→トップページ」へと順に遷移する
export const userURLJudge = (
  user: UserType,
  navigate: NavigateFunction,
  userNameInURL: string | undefined
) => {
  if (userNameInURL !== `user=${user?.email}`) {
    navigate("/");
    return false;
  }
  return true;
};
