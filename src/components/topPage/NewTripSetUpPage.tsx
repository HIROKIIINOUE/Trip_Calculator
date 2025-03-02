import { Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputMoney from "../common/InputMoney";
import InputCurrencyName from "../common/InputCurrencyName";
import { useNavigate } from "react-router-dom";
import { newTripSetUpPageDescription } from "../../localData/translatedDescriptionData";
import { useAppSelector } from "../../app/storeType";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

type Props = {
  setNewTripSetUpPage: React.Dispatch<React.SetStateAction<boolean>>;
  newTripSetUpPage: boolean;
};

const NewTripSetUpPage = (props: Props) => {
  const { setNewTripSetUpPage, newTripSetUpPage } = props;
  const translatedData: any = newTripSetUpPageDescription;
  const navigate = useNavigate();
  const language = useAppSelector((state) => state.language.language);
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const titleRef = useRef<HTMLInputElement>(null);
  const yourCurrencyRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const startDayRef = useRef<HTMLInputElement>(null);

  const closeNewTripSetUpPage = (): void => {
    setNewTripSetUpPage(false);
  };

  // 新しい旅行情報の追加
  // Function to add new trip data
  const handleCreateNewTrip = async () => {
    const title = titleRef.current?.value;
    const yourCurrency = yourCurrencyRef.current?.value;
    const budget = budgetRef.current?.value;
    const startDay = startDayRef.current?.value;

    const collectionRef = collection(
      db,
      "dataList",
      String(userDocumentID),
      "tripList"
    );

    await addDoc(collectionRef, {
      title: title,
      yourCurrency: yourCurrency,
      budget: budget,
      startDay: startDay,
    });

    setButtonDisabled(true);
    setNewTripSetUpPage(false);
    navigate("/");
  };

  // ポップアップ要素のデザイン。画面上からフェードインしてくるアニメーション。
  // The 2 designs for the popup display to make it fade-in animation
  const boxDesignBefore =
    "h-[500px] md:w-[50%] w-[80%] fixed top-12 bottom-0 right-0 left-0 mx-auto bg-orange-100 rounded shadow-lg translate-y-[-800px] duration-1000";
  const boxDesignAfter =
    "h-[500px] md:w-[50%] w-[80%] fixed top-12 bottom-0 right-0 left-0 mx-auto bg-orange-100 rounded shadow-2xl shadow-orange-400 translate-y-[0px] duration-1000";

  return (
    <>
      <div
        className={
          newTripSetUpPage
            ? "fixed top-0 bottom-0 right-0 left-0 opacity-50 bg-slate-500"
            : "hide"
        }
        onClick={closeNewTripSetUpPage}
      ></div>
      <div className={newTripSetUpPage ? boxDesignAfter : boxDesignBefore}>
        <div className="w-full p-8">
          <h2 className="text-center text-[36px]">New Trip!!</h2>
          <div className="w-full mt-4">
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label={translatedData[language][0]}
              variant="outlined"
              inputRef={titleRef}
              inputProps={{ maxLength: 15 }}
              onChange={() =>
                setButtonDisabled(
                  !titleRef.current?.value ||
                    !yourCurrencyRef.current?.value ||
                    !budgetRef.current?.value ||
                    !startDayRef.current?.value
                )
              }
            />
          </div>
          <div className="w-full mt-4">
            <InputCurrencyName
              titleRef={titleRef}
              yourCurrencyRef={yourCurrencyRef}
              budgetRef={budgetRef}
              startDayRef={startDayRef}
              setButtonDisabled={setButtonDisabled}
            />
          </div>
          <div className="w-full mt-4">
            <InputMoney
              titleRef={titleRef}
              yourCurrencyRef={yourCurrencyRef}
              budgetRef={budgetRef}
              startDayRef={startDayRef}
              setButtonDisabled={setButtonDisabled}
            />
          </div>
          <div className="w-full mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{
                  field: {
                    readOnly: true,
                  },
                }}
                label={translatedData[language][2]}
                sx={{ width: "100%" }}
                inputRef={startDayRef}
                onChange={(date) => {
                  const dateString = date?.toISOString().split("T")[0];
                  setButtonDisabled(
                    !titleRef.current?.value ||
                      !yourCurrencyRef.current?.value ||
                      !budgetRef.current?.value ||
                      !dateString
                  );
                }}
              />
            </LocalizationProvider>
          </div>
          <Button
            sx={{ width: "100%", height: "48px", marginTop: "36px" }}
            variant="contained"
            color="warning"
            onClick={handleCreateNewTrip}
            disabled={buttonDisabled}
          >
            {translatedData[language][3]}
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewTripSetUpPage;
