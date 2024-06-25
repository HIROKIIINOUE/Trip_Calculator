import { Box } from "@mui/material";
import React from "react";
import { TripType } from "../../type/TripType";
import { useAppSelector } from "../../app/storeType";
import { topPageDescription } from "../../localData/translatedDescriptionData";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DocumentData,
  DocumentReference,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

type Props = {
  trip: TripType;
};

const Trip = (props: Props) => {
  const { trip } = props;
  const userDocumentID = useAppSelector((state) => state.user.userDocumentID);

  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = topPageDescription;
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const deleteTrip = async () => {
    if (!window.confirm(`${trip.title} : ${translatedData[language][8]}`)) {
      return;
    }
    const documentRef: DocumentReference<DocumentData> = doc(
      db,
      "dataList",
      String(userDocumentID),
      "tripList",
      String(trip.id)
    );
    await deleteDoc(documentRef);
  };

  const toSecondPage = () => {
    navigate(`/user=${user?.displayName}/${trip.id}`);
  };

  

  return (
    <div className="mt-8 flex">
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgb(255 237 213)",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          width: "95%",
          borderRadius: "8px",
          border: "solid 2px",
          borderColor: "rgb(251 146 60)",
          cursor: "pointer",
          boxShadow: "4px 4px 15px -5px #777777",
          "&:hover": {
            opacity: "0.7",
          },
        }}
        onClick={toSecondPage}
      >
        <div className="h-full w-full">
          <h2 className="h-[40%] w-full text-[24px] bg-orange-100 text-center rounded-xl">
            {trip.title}
          </h2>
          <div className="h-[60%] w-full flex  font-bold">
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][2]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {trip.yourCurrency}
              </p>
            </div>
            <div className="h-hull w-[34%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][4]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {trip.budget}
              </p>
            </div>
            <div className="h-hull w-[33%] px-2">
              <p className="h-[50%] flex items-center justify-center border-b-2 border-orange-400">
                {translatedData[language][6]}
              </p>
              <p className="h-[50%] flex items-center justify-center">
                {trip.startDay}
              </p>
            </div>
          </div>
        </div>
      </Box>
      <div className="width-[5%] flex items-center justify-center ml-2">
        <DeleteIcon
          className="hover:cursor-pointer hover:opacity-40"
          onClick={deleteTrip}
        />
      </div>
    </div>
  );
};

export default Trip;
