import React from "react";
import { useAppSelector } from "../../app/storeType";
import { secondPageDescription } from "../../localData/translatedDescriptionData";
import { TableType } from "../../type/TableType";

type Props = {
  tableData: TableType;
  setDisplayDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const Detail = (props: Props) => {
  const { tableData, setDisplayDetail } = props;
  const language = useAppSelector((state) => state.language.language);
  const translatedData: any = secondPageDescription;

  const handleClose = () => {
    setDisplayDetail(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-300 opacity-80 z-10"
        onClick={handleClose}
      ></div>
      <div
        className={
          "fixed top-[200px] left-0 right-0 mx-auto h-[220px] p-3 w-[80%] md:w-[50%] bg-[#F3FFD8] rounded-lg border-double border-orange-400 border-4 z-20"
        }
      >
        <h3 className="h-[20%] p-2 border-b-2  border-orange-400 text-center">
          {translatedData[language][6]}
        </h3>
        <p className="h-[80%] p-2 break-words">{tableData.detail}</p>
      </div>
    </>
  );
};

export default Detail;
