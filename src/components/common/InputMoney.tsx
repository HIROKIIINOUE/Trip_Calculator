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
  const translatedData: any = newTripSetUpPageDescription;
  const language = useAppSelector((state) => state.language.language);

  const formatBudget = (value: string) => {
    const numericValue = value.replace(/,/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleBudgetChange = () => {
    if (budgetRef.current) {
      const formattedValue = formatBudget(budgetRef.current.value);
      budgetRef.current.value = formattedValue;
    }
  };

  // 予算のデータで文字列を入力するとエラーになる処理
  const checkCorrectBudgetValue = () => {
    const budget = budgetRef.current?.value;
    const budgetWithoutComma = budget?.replaceAll(",", "");
    if (!Number(budgetWithoutComma)) {
      alert(translatedData[language][4]);
      if (budgetRef.current) {
        budgetRef.current.value = "";
      }
      setButtonDisabled(true);
      return;
    }
    if (budgetRef.current && Number(budget?.length) > 10) {
      budgetRef.current.value = "";
      setButtonDisabled(true);
      return;
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
        label={translatedData[language][1]}
        type="text"
        variant="outlined"
        inputRef={budgetRef}
        inputProps={{
          maxLength: 10,
          inputMode: "numeric", // 数値キーボードを表示
          pattern: "[0-9]*", // 半角数値のみ許可
        }}
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
        onBlur={checkCorrectBudgetValue}
      />
    </>
  );
};

export default InputMoney;
