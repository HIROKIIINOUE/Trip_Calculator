// ココから：「作成」ボタン押下時に選択通貨を空欄に戻す。

import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/storeType";
import { current } from "@reduxjs/toolkit";

type Props = {
  titleRef: React.RefObject<HTMLInputElement>;
  yourCurrencyRef: React.RefObject<HTMLInputElement>;
  budgetRef: React.RefObject<HTMLInputElement>;
  startDayRef: React.RefObject<HTMLInputElement>;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputCurrencyName = (props: Props) => {
  const {
    titleRef,
    yourCurrencyRef,
    budgetRef,
    startDayRef,
    setButtonDisabled,
  } = props;

  const currencyNameList = useAppSelector(
    (state) => state.currency.currencyNameList
  );

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    if (yourCurrencyRef.current) {
      yourCurrencyRef.current.value = value;
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
      <FormControl className="w-full">
        <Select
          displayEmpty
          onChange={handleChange}
          input={<OutlinedInput />}
          inputRef={yourCurrencyRef}
          renderValue={(selected) => {
            if (!selected) {
              return <em>選択</em>;
            }
            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>通貨</em>
          </MenuItem>
          {currencyNameList?.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <TextField
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
      /> */}
    </>
  );
};

export default InputCurrencyName;
