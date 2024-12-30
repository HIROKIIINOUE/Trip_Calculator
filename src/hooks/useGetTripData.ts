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

type User = {
  uid: string;
  photo: string;
  email: string;
  displayName: string;
} | null;

export const useGetTripData = (
  user: User,
  navigate: NavigateFunction,
  userName: string | undefined,
  tripList: any,
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
