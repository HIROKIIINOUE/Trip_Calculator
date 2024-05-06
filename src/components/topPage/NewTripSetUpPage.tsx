import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  setNewTripSetUpPage: React.Dispatch<React.SetStateAction<boolean>>;
  newTripSetUpPage: boolean;
};

const NewTripSetUpPage = (props: Props) => {
  const { setNewTripSetUpPage, newTripSetUpPage } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const yourCurrencyRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const startDayRef = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const closeNewTripSetUpPage = (): void => {
    setNewTripSetUpPage(false);
  };

  const handleCreateNewTrip = () => {
    const title = titleRef.current?.value;
    const yourCurrency = yourCurrencyRef.current?.value;
    const budget = budgetRef.current?.value;
    const startDay = startDayRef.current?.value;

    console.log(title, yourCurrency, budget, startDay);

    // 入力後にインプットvalueを空にする
    if (titleRef.current) {
      titleRef.current.value = "";
    }
    if (yourCurrencyRef.current) {
      yourCurrencyRef.current.value = "";
    }
    if (budgetRef.current) {
      budgetRef.current.value = "";
    }
    if (startDayRef.current) {
      startDayRef.current.value = "";
    }
    setButtonDisabled(true);
    setNewTripSetUpPage(false);
  };

  const boxDesignBefore =
    "h-[500px] md:w-[50%] w-[80%] fixed top-12 bottom-0 right-0 left-0 mx-auto bg-orange-100 rounded translate-y-[-800px] duration-1000";
  const boxDesignAfter =
    "h-[500px] md:w-[50%] w-[80%] fixed top-12 bottom-0 right-0 left-0 mx-auto bg-orange-100 rounded translate-y-[0px] duration-1000";

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
              label="タイトル"
              variant="outlined"
              inputRef={titleRef}
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
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="自国通貨"
              variant="outlined"
              inputRef={yourCurrencyRef}
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
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="予算"
              variant="outlined"
              inputRef={budgetRef}
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
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="開始日"
              variant="outlined"
              inputRef={startDayRef}
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
          <Button
            sx={{ width: "100%", height: "48px", marginTop: "36px" }}
            variant="contained"
            color="warning"
            onClick={handleCreateNewTrip}
            disabled={buttonDisabled}
          >
            作成
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewTripSetUpPage;
