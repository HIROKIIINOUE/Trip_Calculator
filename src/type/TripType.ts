import { Timestamp } from "firebase/firestore";

// ココのany修正
export interface TripType {
  title: string;
  yourCurrency: string;
  budget: any;
  startDay: any;
  id: string;
}
