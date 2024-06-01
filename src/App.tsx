import React from "react";
import LoginPage from "./components/loginPage/LoginPage";
import TopPage from "./components/topPage/TopPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecondPage from "./components/secondPage/SecondPage";
import NoPage from "./components/common/NoPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/:userName" element={<TopPage />} />
        <Route path="/:userName/testForNow" element={<SecondPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
