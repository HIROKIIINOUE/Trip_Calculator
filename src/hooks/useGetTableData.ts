import { useEffect } from "react";
import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { TripType } from "../type/TripType";

export const useGetTableData = (
  tripId: string | undefined,
  userDocumentID: string | null,
  setTableList: React.Dispatch<React.SetStateAction<TripType[]>>
) => {
  useEffect(() => {
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(
        db,
        "dataList",
        String(userDocumentID),
        "tripList",
        String(tripId),
        "tableList"
      );
    const collectionRefOrderBy = query(collectionRef, orderBy("date", "desc"));

    const getTableDataListFromDatabase = onSnapshot(
      collectionRefOrderBy,
      (querySnapshot) => {
        // ココ修正：any型
        const results: any = [];
        querySnapshot.docs.forEach((doc) => {
          results.push({
            date: doc.data().date,
            currency: doc.data().currency,
            money: doc.data().money,
            moneyResult: doc.data().moneyResult,
            detail: doc.data().detail,
            id: doc.id,
          });
          setTableList(results);
        });
      }
    );

    return () => getTableDataListFromDatabase();
  }, []);
};
