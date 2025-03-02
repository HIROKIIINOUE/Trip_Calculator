import { NavigateFunction } from "react-router-dom";
import { TripType } from "../type/TripType";

// 2ページ目のURL「/:userName/:tripId」を手書きで変更した時、変更後の/:tripId部分が既にデータベース上にあるtripデータのどのIDとも一致しない時、トップページに自動的に遷移する処理。
// If user changes URL physically, it's rejected unless it's proper URL

export const tripExistJudge = (
  tripList: TripType[],
  tripId: string | undefined,
  navigate: NavigateFunction
) => {
  const arrayForJudge = tripList.filter((trip: TripType) => {
    return trip.id === tripId;
  });

  if (arrayForJudge.length === 0) {
    navigate("/");
    return false;
  } else {
    return true;
  }
};
