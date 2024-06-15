import { TextField } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/storeType";
import { newTripSetUpPageDescription } from "../../localData/translatedDescriptionData";

type Props = {
  titleRef: React.RefObject<HTMLInputElement>;
  yourCurrencyRef: React.RefObject<HTMLInputElement>;
  budgetRef: React.RefObject<HTMLInputElement>;
  startDayRef: React.RefObject<HTMLInputElement>;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputMoney = (props: Props) => {
  const {
    titleRef,
    yourCurrencyRef,
    budgetRef,
    startDayRef,
    setButtonDisabled,
  } = props;
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = newTripSetUpPageDescription;

  const formatBudget = (value: string) => {
    const numericValue = value.replace(/,/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBudgetChange = () => {
    if (budgetRef.current) {
      const formattedValue = formatBudget(budgetRef.current.value);
      budgetRef.current.value = formattedValue;
    }
    setButtonDisabled(
      !titleRef.current?.value ||
        !yourCurrencyRef.current?.value ||
        !budgetRef.current?.value ||
        !startDayRef.current?.value
    );
  };

  return (
    <>
      <TextField
        sx={{ width: "100%" }}
        id="outlined-basic"
        label={translatedData[language][3]}
        type="text"
        variant="outlined"
        inputRef={budgetRef}
        onChange={handleBudgetChange}
        // 自分用：スクロールしたらインプット項目が変化してしまうエラーの修正
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
    </>
  );
};

export default InputMoney;
