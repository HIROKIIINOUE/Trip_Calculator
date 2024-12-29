import { NavigateFunction } from "react-router-dom";

type User = {
  uid: string;
  photo: string;
  email: string;
  displayName: string;
} | null;

// ↓ログイン情報とURLパラメータが正しく一致しないとき、ログイン画面へ遷移
//   ※ログインしている場合は「ログイン画面→トップページ」へと順に遷移する
export const userURLJudge = (
  user: User,
  navigate: NavigateFunction,
  userNameInURL: string | undefined
) => {
  if (userNameInURL !== `user=${user?.email}`) {
    navigate("/");
    return false;
  }
  return true
};
