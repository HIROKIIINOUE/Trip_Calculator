import React, { useState } from "react";

type Props = {
  languageOptionPage: boolean;
  setLanguageOptionPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const LanguageOption = (props: Props) => {
  const { setLanguageOptionPage, languageOptionPage } = props;
  const [fadeUp, setFadeUp] = useState<boolean>(false);

  const closeLanguageOptionPage = () => {
    setLanguageOptionPage(false);
    setFadeUp(false);
  };

  const handleFadeUp = () => {
    setFadeUp(true);
  };

  if (languageOptionPage) {
    setTimeout(handleFadeUp, 10);
  }

  return (
    <>
      <div
        onClick={closeLanguageOptionPage}
        className="fixed top-0 right-0 left-0 bottom-0 bg-slate-600 z-10 opacity-95"
      ></div>
      <div className="sm:w-[40%] w-[70%] h-[30%] mx-auto fixed top-[200px] right-0 left-0 bg-slate-600 z-20 text-white rounded shadow-xl">
        <p className="animate-fade-up animate-infinite text-[24px] h-[33%] border-b flex items-end justify-center hover:bg-slate-500 cursor-pointer duration-700 active:animate-ping">
          <span
            className={fadeUp ? "duration-1000" : "translate-y-6 opacity-10"}
          >
            日本語
          </span>
        </p>  
        <p className="text-[24px] h-[33%] border-b flex items-end justify-center hover:bg-slate-500 cursor-pointer  duration-700">
          <span
            className={fadeUp ? "duration-1000" : "translate-y-6 opacity-10"}
          >
            English
          </span>
        </p>
        <p className="text-[24px] h-[33%] border-b flex items-end justify-center hover:bg-slate-500 cursor-pointer  duration-700">
          <span
            className={fadeUp ? "duration-1000" : "translate-y-6 opacity-10"}
          >
            Français
          </span>
        </p>
      </div>
    </>
  );
};

export default LanguageOption;
