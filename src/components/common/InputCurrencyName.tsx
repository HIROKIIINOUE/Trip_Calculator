import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/storeType";
import { inputCurrencyNameDescription } from "../../localData/translatedDescriptionData";

// 自分用：共通コンポーネントでは受け渡されるプロップスが異なるので型指定にオプショナルプロップス 「末尾に?マーク」 を使用する
// use [?] for optional props
type Props = {
  titleRef?: React.RefObject<HTMLInputElement>;
  yourCurrencyRef?: React.RefObject<HTMLInputElement>;
  budgetRef?: React.RefObject<HTMLInputElement>;
  startDayRef?: React.RefObject<HTMLInputElement>;
  setButtonDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrency?: React.Dispatch<React.SetStateAction<string>>;
  secondPage?: boolean;
};

const InputCurrencyName = (props: Props) => {
  const {
    titleRef,
    yourCurrencyRef,
    budgetRef,
    startDayRef,
    setButtonDisabled,
    setCurrency,
    secondPage,
  } = props;
  const translatedData: any = inputCurrencyNameDescription;
  const language = useAppSelector((state) => state.language.language);
  const currencyNameList = useAppSelector(
    (state) => state.currency.currencyNameList
  );

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

  const handleChangeForSecondPage = (e: SelectChangeEvent<string>) => {
    setCurrency!(e.target.value);
  };

  return (
    <>
      <FormControl className="w-full text-left">
        <Select
          displayEmpty
          onChange={
            setButtonDisabled
              ? handleChange
              : (e) => handleChangeForSecondPage(e)
          }
          input={<OutlinedInput />}
          inputRef={yourCurrencyRef}
          renderValue={(selected) => {
            if (!selected) {
              if (secondPage) {
                return (
                  <em className="not-italic tex">
                    {translatedData[language][1]}
                  </em>
                );
              } else {
                return (
                  <em className="not-italic tex">
                    {translatedData[language][0]}
                  </em>
                );
              }
            }
            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
          defaultValue=""
        >
          <MenuItem disabled value="">
            {secondPage ? (
              <em className="not-italic">{translatedData[language][1]}</em>
            ) : (
              <em className="not-italic">{translatedData[language][0]}</em>
            )}
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
