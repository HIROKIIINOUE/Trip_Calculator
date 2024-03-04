import React from "react";

type Props = {
  setLanguageOptionPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const LanguageOption = (props: Props) => {
  const { setLanguageOptionPage } = props;

  const closeLanguageOptionPage = () => {
    setLanguageOptionPage(false);
  };

  // 【次回】言語選択ページのデザイン作成
  return (
    <>
      <div
        onClick={closeLanguageOptionPage}
        className="fixed top-0 right-0 left-0 bottom-0 bg-slate-600 z-10"
      ></div>
    </>
  );
};

export default LanguageOption;
