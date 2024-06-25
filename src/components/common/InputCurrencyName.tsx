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

// 自分用：共通コンポーネントでは受け渡されるプロップスが異なるので型指定にオプショナルプロップス 「末尾に?マーク」 を使用する
type Props = {
  titleRef?: React.RefObject<HTMLInputElement>;
  yourCurrencyRef?: React.RefObject<HTMLInputElement>;
  budgetRef?: React.RefObject<HTMLInputElement>;
  startDayRef?: React.RefObject<HTMLInputElement>;
  setButtonDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrency?: React.Dispatch<React.SetStateAction<string>>;
};

const InputCurrencyName = (props: Props) => {
  const {
    titleRef,
    yourCurrencyRef,
    budgetRef,
    startDayRef,
    setButtonDisabled,
    setCurrency,
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
    if (yourCurrencyRef?.current) {
      yourCurrencyRef.current.value = value;
    }
    setButtonDisabled!(
      !titleRef?.current?.value ||
        !yourCurrencyRef?.current?.value ||
        !budgetRef?.current?.value ||
        !startDayRef?.current?.value
    );
  };

  const handleChange2 = (e: SelectChangeEvent<string>) => {
    setCurrency!(e.target.value);
  };

  return (
    <>
      <FormControl className="w-full text-left">
        <Select
          displayEmpty
          onChange={setButtonDisabled ? handleChange : (e) => handleChange2(e)}
          input={<OutlinedInput />}
          inputRef={yourCurrencyRef}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <em className="not-italic tex">
                  {translatedData[language][1]}
                </em>
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
