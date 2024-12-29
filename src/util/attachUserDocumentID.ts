import {
  collection,
  CollectionReference,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { attachDocumentID } from "../slices/userSlice";

type User = {
  uid: string;
  photo: string;
  email: string;
  displayName: string;
} | null;

// ↓↓ログインしているuser情報のfirebase上にあるドキュメントIDを取得し、reduxで管理↓↓
// ※firebaseデータベース上にログイン情報が無ければuserDocumentIDがnullになり、GetStarted.tsxが表示される
export const attachUserDocumentID = async (user: User, dispatch: any) => {
  const collectionRef: CollectionReference<DocumentData, DocumentData> =
    collection(db, "dataList");
  const q = query(collectionRef, where("user.uid", "==", user?.uid));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return;
  }

  querySnapshot.docs.forEach((doc) => {
    dispatch(attachDocumentID(doc.id));
    localStorage.setItem("userDocumentID", doc.id);
  });
};
