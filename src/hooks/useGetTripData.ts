import { useEffect } from "react";
import { userLoginJudge } from "../util/userLoginJudge";
import { userURLJudge } from "../util/userURLJudge";
import { tripExistJudge } from "../util/tripExistJudge";
import {
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { NavigateFunction } from "react-router-dom";
import { TripType } from "../type/TripType";
import { UserType } from "../type/UserType";

export const useGetTripData = (
  user: UserType,
  navigate: NavigateFunction,
  userName: string | undefined,
  tripList: TripType[],
  tripId: string | undefined,
  userDocumentID: string | null,
  setTripData: React.Dispatch<any>
) => {
  useEffect(() => {
    const userJudge = userLoginJudge(user, navigate);
    const URLJudge = userURLJudge(user, navigate, userName);
    const tripJudge = tripExistJudge(tripList, tripId, navigate);
    if (!userJudge || !URLJudge || !tripJudge) {
      return;
    }

    const documentRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "dataList",
      String(userDocumentID),
      "tripList",
      String(tripId)
    );

    const getTripDataFromDatabase = onSnapshot(documentRef, (doc) => {
      setTripData(doc.data());
    });

    return () => getTripDataFromDatabase();
  }, []);
};
