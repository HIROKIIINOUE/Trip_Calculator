import React from "react";

type Props = {
  setDisplayDetail: React.Dispatch<React.SetStateAction<boolean>>;
  tableData: any;
};

const Detail = (props: Props) => {
  const { setDisplayDetail, tableData } = props;

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
          詳細
        </h3>
        <p className="h-[80%] p-2">{tableData.detail}</p>
      </div>
    </>
  );
};

export default Detail;
