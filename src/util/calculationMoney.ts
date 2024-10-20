export const calculationMoney = async (
  yourCurrency: string,
  currency: string,
  // ↓【修正】ココのany修正
  currencyRateList: any,
  money: number,
  setMoneyResult: React.Dispatch<React.SetStateAction<number>>
) => {
  const yourCurrencyRate = currencyRateList[yourCurrency];
  const tripCurrencyRate = currencyRateList[currency];

  if (currency === "") {
    alert("現地の通貨を入力してください");
    return;
  }

  const result = (money / tripCurrencyRate) * yourCurrencyRate;
  setMoneyResult(result);
};
