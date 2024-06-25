import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const calculationMoney = async (
  userDocumentID: string | null,
  tripId: string | undefined,
  currency: string,
  // ↓【修正】ココのany修正
  currencyRateList: any,
  money: number,
  setMoneyResult: React.Dispatch<React.SetStateAction<number>>
) => {
  const collectionRef = doc(
    db,
    "dataList",
    String(userDocumentID),
    "tripList",
    String(tripId)
  );
  const querySnapshot = await getDoc(collectionRef);
  const yourCurrency = querySnapshot.data()!.yourCurrency;

  const yourCurrencyRate = currencyRateList[yourCurrency];
  const tripCurrencyRate = currencyRateList[currency];

  if (!tripCurrencyRate) {
    alert("支払った通貨を入力してください");
  }

  const result = (money / tripCurrencyRate) * yourCurrencyRate;
  setMoneyResult(result);
};
