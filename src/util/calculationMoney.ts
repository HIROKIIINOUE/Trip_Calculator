export const calculationToYourCurrency = async (
  yourCurrency: string | undefined,
  currency: string,
  // ↓【修正】ココのany修正
  currencyRateList: any,
  money: number,
  setMoneyResult: React.Dispatch<React.SetStateAction<number>>,
  setGuideClick: React.Dispatch<React.SetStateAction<boolean>>,
  translatedData: string
) => {
  // yourCurrencyはundefinedの可能性があるためココでチェック
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
