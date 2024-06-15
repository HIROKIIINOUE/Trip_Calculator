// ココから：「作成」ボタン押下時に選択通貨を空欄に戻す。

import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
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
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = newTripSetUpPageDescription;

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
              return (
                <em className="not-italic">{translatedData[language][1]}</em>
              );
            }
            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
          defaultValue=""
        >
          <MenuItem disabled value="">
            <em className="not-italic">{translatedData[language][2]}</em>
          </MenuItem>
          {currencyNameList?.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default InputCurrencyName;
