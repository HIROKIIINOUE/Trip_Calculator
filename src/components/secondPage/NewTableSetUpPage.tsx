import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputCurrencyName from "../common/InputCurrencyName";
import dayjs from "dayjs";
import { useAppSelector } from "../../app/storeType";
import { calculationMoney } from "../../util/calculationMoney";

type Props = {
  setNewTableSetUpPage: React.Dispatch<React.SetStateAction<boolean>>;
  yourCurrency: string;
};

// 勉強のためテーブルのsetupポップアップはuseStateで状態管理。
// ※tripのsetupポップアップはuseRefで状態を管理している。

const NewTableSetUpPage = (props: Props) => {
  const { setNewTableSetUpPage, yourCurrency } = props;
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [money, setMoney] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [moneyResult, setMoneyResult] = useState<number>(0);
  const [detail, setDetail] = useState<string>("");
  const currencyRateList = useAppSelector(
    (state) => state.currency.currencyRateList
  );

  const backToSecondPage = () => {
    setNewTableSetUpPage(false);
  };

  const submit = () => {
    console.log(date, money, currency, moneyResult, detail, yourCurrency);
  };

  return (
    <div>
      <div
        className={
          "fixed top-0 bottom-0 right-0 left-0 bg-slate-300 opacity-80"
        }
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
                label={"日付"}
                sx={{
                  width: "100%",
                  backgroundColor: "#F3FFD8",
                  borderRadius: 2,
                  border: "4px double rgb(251 146 60)",
                }}
                onChange={(e: dayjs.Dayjs | null) => setDate(e)}
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
              type="number"
              sx={{
                width: "100%",
                backgroundColor: "#F3FFD8",
                border: "4px double rgb(251 146 60)",
                borderRadius: 2,
              }}
              id="outlined-basic"
              label="お金"
              variant="outlined"
              value={money}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => setMoney(Number(e.target.value))}
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
            <CurrencyExchangeIcon
              className="mr-2 cursor-pointer hover:opacity-60 flex items-center"
              fontSize="large"
              onClick={() =>
                calculationMoney(
                  yourCurrency,
                  currency,
                  currencyRateList,
                  money,
                  setMoneyResult
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
              label="詳細"
              variant="outlined"
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
            <span className="text-2xl">戻る</span>
          </Button>
          <Button
            variant="contained"
            className="w-full h-full"
            color="warning"
            // disabled={
            //   date !== null && money !== 0 && yenMoney !== 0 && detail !== ""
            //     ? false
            //     : true
            // }
            onClick={() => submit()}
          >
            <span className="text-2xl">追加</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTableSetUpPage;
