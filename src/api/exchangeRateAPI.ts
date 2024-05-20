type PromiseState = () => Promise<any>;

// //  ↓↓モックAPIデータ
export const fetchData: PromiseState = async () => {
  const res = await fetch("http://localhost:3001/currencyInformation");
  const result = await res.json();
  return result;
};
// //  ↑↑ここまでモックAPIデータ
