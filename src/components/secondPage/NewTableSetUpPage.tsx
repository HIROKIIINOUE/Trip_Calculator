import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputCurrencyName from "../common/InputCurrencyName";
import dayjs from "dayjs";
import { useAppSelector } from "../../app/storeType";
import { calculationToYourCurrency } from "../../util/calculationMoney";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import { newTableSetUpPageDescription } from "../../localData/translatedDescriptionData";

type Props = {
  setNewTableSetUpPage: React.Dispatch<React.SetStateAction<boolean>>;
  yourCurrency: string;
};

// 勉強のためテーブルのsetupポップアップはuseStateで状態管理。
// ※tripのsetupポップアップはuseRefで状態を管理している。

const NewTableSetUpPage = (props: Props) => {
  const { setNewTableSetUpPage, yourCurrency } = props;
  const [date, setDate] = useState<any>(null);
  const [money, setMoney] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [moneyResult, setMoneyResult] = useState<number>(0);
  const [guideClick, setGuideClick] = useState<boolean>(true);
  const [detail, setDetail] = useState<string>("");
  const currencyRateList = useAppSelector(
    (state) => state.currency.currencyRateList
  );
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const { tripId } = useParams();
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = newTableSetUpPageDescription;

  const backToSecondPage = () => {
    setNewTableSetUpPage(false);
  };

  const submit = async () => {
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(
        db,
        "dataList",
        String(userDocumentID),
        "tripList",
        String(tripId),
        "tableList"
      );
    await addDoc(collectionRef, {
      date: date,
      money: money,
      currency: currency,
      moneyResult: Math.ceil(moneyResult),
      detail: detail,
    });

    setNewTableSetUpPage(false);
  };

  useEffect(() => {
    setMoneyResult(0);
    setGuideClick(true);
  }, [money, currency]);

  const handleMoneyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value;
    const inputValueWithoutComma = inputValue.replaceAll(",", "");

    if (
      Number(inputValueWithoutComma) ||
      Number(inputValueWithoutComma) === 0
    ) {
      setMoney(Number(inputValueWithoutComma));
    } else {
      alert(translatedData[language][7]);
    }
  };

  return (
    <div>
      <div
        className={"fixed inset-0 bg-slate-300 opacity-80"}
        onClick={backToSecondPage}
      ></div>
      <div
        className={
          "fixed top-[40px] xl:top-[80px] left-0 right-0 mx-auto h-auto py-8 w-[90%] bg-white rounded"
        }
      >
        <div className="xl:flex gap-2 px-4">
          <Box
            sx={{
              width: "12%",
              "@media (max-width: 1280px)": {
                width: "100%",
              },
              height: "100%",
              textAlign: "center",
              fontSize: "24px",
              lineHeight: "50px",
              marginBottom: "8px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={translatedData[language][0]}
                sx={{
                  width: "100%",
                  backgroundColor: "#F3FFD8",
                  borderRadius: 2,
                  border: "4px double rgb(251 146 60)",
                }}
                //↓自分用：日付データのイベント引数は以下のように変換すること
                onChange={(date: dayjs.Dayjs | null) =>
                  setDate(date?.toISOString().split("T")[0])
                }
              />
            </LocalizationProvider>
          </Box>

          <Box
            sx={{
              width: "10%",
              "@media (max-width: 1280px)": {
                width: "100%",
              },
              height: "100%",
              textAlign: "center",
              fontSize: "24px",
              marginBottom: "8px",
            }}
          >
            <TextField
              type="text"
              sx={{
                width: "100%",
                backgroundColor: "#F3FFD8",
                border: "4px double rgb(251 146 60)",
                borderRadius: 2,
              }}
              id="outlined-basic"
              placeholder="0"
              label={translatedData[language][1]}
              variant="outlined"
              value={money === 0 ? "" : money.toLocaleString()}
              onChange={(e) => handleMoneyChange(e)}
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
            />
          </Box>

          <Box
            sx={{
              width: "10%",
              "@media (max-width: 1280px)": {
                width: "100%",
              },
              height: "100%",
              backgroundColor: "#F3FFD8",
              border: "4px double rgb(251 146 60)",
              textAlign: "center",
              fontSize: "24px",
              borderRadius: 2,
              marginBottom: "8px",
            }}
          >
            <InputCurrencyName setCurrency={setCurrency} />
          </Box>

          <Box
            sx={{
              width: "15%",
              "@media (max-width: 1280px)": {
                width: "100%",
              },
              height: "63px",
              backgroundColor: "#F3FFD8",
              border: "4px double rgb(251 146 60)",
              textAlign: "center",
              fontSize: "24px",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <p className="bg-transparent w-full text-left pl-3">
              {!moneyResult ? 0 : Math.ceil(moneyResult).toLocaleString()}
            </p>
            {guideClick && (
              <p className="text-[#333333] opacity-60 pr-2 select-none">
                {translatedData[language][3]}→
              </p>
            )}
            <CurrencyExchangeIcon
              className="mr-2 cursor-pointer hover:opacity-60 flex items-center"
              fontSize="large"
              onClick={() =>
                calculationToYourCurrency(
                  yourCurrency,
                  currency,
                  currencyRateList,
                  money,
                  setMoneyResult,
                  setGuideClick,
                  translatedData[language][8]
                )
              }
            />
          </Box>

          <Box
            sx={{
              width: "53%",
              "@media (max-width: 1280px)": {
                width: "100%",
              },
              height: 60,
              textAlign: "center",
              fontSize: "24px",
            }}
          >
            <TextField
              sx={{
                width: "100%",
                backgroundColor: "#F3FFD8",
                border: "4px double rgb(251 146 60)",
                borderRadius: 2,
              }}
              id="outlined-basic"
              label={translatedData[language][4]}
              variant="outlined"
              inputProps={{ maxLength: 70 }}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setDetail(e.target.value)}
            />
          </Box>
        </div>

        <div className="flex mt-6 h-[60px] sm:w-[400px] w-[280px] mx-auto gap-5">
          <Button
            variant="contained"
            className="w-full h-full"
            color="warning"
            onClick={backToSecondPage}
          >
            <span className="text-2xl">{translatedData[language][5]}</span>
          </Button>
          <Button
            variant="contained"
            className="w-full h-full"
            color="warning"
            disabled={
              date !== null &&
              money !== 0 &&
              yourCurrency !== null &&
              moneyResult !== 0 &&
              detail !== ""
                ? false
                : true
            }
            onClick={() => submit()}
          >
            <span className="text-2xl">{translatedData[language][6]}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTableSetUpPage;
