import { useEffect } from "react";
import {
  setCurrencyNameList,
  setCurrencyRateList,
} from "../slices/currencySlice";
import { useAppDispatch } from "../app/storeType";
import { userLoginJudge } from "../util/userLoginJudge";
import { userURLJudge } from "../util/userURLJudge";
import { NavigateFunction } from "react-router-dom";
import { UserType } from "../type/UserType";
import { fetchRateData } from "../api/currencyRateAPI";

export const useFetchCurrency = async (
  user: UserType,
  userName: string | undefined,
  navigate: NavigateFunction
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // URLの「/:userName」を手打ちした時、「ログインしていない」もしくは「手打ちしたURLがログインしているユーザ情報と一致しない」時は自動でログイン画面に遷移され、attachUserDocumentID以降の処理は実行されない。(ログインしている場合はログイン画面→トップページへと遷移される)
    // If user change URL physically, it's rejected unless it's proper URL

    const userJudge = userLoginJudge(user, navigate);
    const URLJudge = userURLJudge(user, navigate, userName);
    if (userJudge === false || URLJudge === false) {
      return;
    }
    const getExchangeRateData = async (): Promise<void> => {
      // api/exchangeRateAPI.ts からAPI関数を叩く
      // Call API via api/exchangeRateAPI
      const data = await fetchRateData();
      const currencyRateList = data.conversion_rates;
      const currencyNameList = Object.keys(currencyRateList);
      dispatch(setCurrencyRateList(currencyRateList));
      dispatch(setCurrencyNameList(currencyNameList));

      const JSONCurrencyNameList = JSON.stringify(currencyNameList);
      localStorage.setItem("currencyNameList", JSONCurrencyNameList);
      const JSONCurrencyRateList = JSON.stringify(currencyRateList);
      localStorage.setItem("currencyRateList", JSONCurrencyRateList);
    };
    getExchangeRateData();
  }, []);
};
