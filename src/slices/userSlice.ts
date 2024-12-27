import { createSlice } from "@reduxjs/toolkit";
import { UserInformation } from "../type/UserType";

// 自分用：ローカルストレージを使用した初期値(userデータ)の設定。ページを更新してもデータが保持されるように設定。
// LocalStorageを使用せずReduxのみでUser情報を管理すると、SecondPage.tsx上でページ更新時にホーム画面に自動遷移されてしまう。
//   →ページ更新時に一瞬ReduxのUser情報がnullになってしまうため。
const getUserLocalStorageValue = (key: string, initialValue: null) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : initialValue;
};
// 自分用：ローカルストレージを使用した初期値(userDocumentIDデータ)の設定。ページを更新してもデータが保持されるように設定。
const getUserDocumentIDLocalStorageValue = (
  key: string,
  initialValue: null
) => {
  const item = localStorage.getItem(key);

  return item ? item : initialValue;
};

const userInformation: UserInformation = {
  user: getUserLocalStorageValue("user", null),
  userDocumentID: getUserDocumentIDLocalStorageValue("userDocumentID", null),
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInformation,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userDocumentID = null;
    },
    attachDocumentID: (state, action) => {
      state.userDocumentID = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, attachDocumentID } = userSlice.actions;
