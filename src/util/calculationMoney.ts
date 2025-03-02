export const calculationToYourCurrency = (
  yourCurrency: string | undefined,
  currency: string,
  currencyRateList: any,
  money: number,
  setMoneyResult: React.Dispatch<React.SetStateAction<number>>,
  setGuideClick: React.Dispatch<React.SetStateAction<boolean>>,
  translatedData: string
) => {
  
  // yourCurrencyはundefinedの可能性があるためココでチェック
  // Judge if yourCurrency is undefined
  if (!yourCurrency) {
    return;
  }

  const yourCurrencyRate = currencyRateList[yourCurrency];
  const tripCurrencyRate = currencyRateList[currency];

  if (currency === "") {
    alert(translatedData);
    return;
  }

  const result = (money / tripCurrencyRate) * yourCurrencyRate;
  setMoneyResult(result);
  setGuideClick(false);
};
