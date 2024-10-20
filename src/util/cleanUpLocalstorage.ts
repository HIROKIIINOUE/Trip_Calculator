export const cleanUpLocalStorageExceptLanguage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userDocumentID");
  localStorage.removeItem("currencyNameList");
  localStorage.removeItem("currencyRateList");
  localStorage.removeItem("tripList");
};
