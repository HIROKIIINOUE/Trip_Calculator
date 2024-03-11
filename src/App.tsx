import React from "react";
import LoginPage from "./components/loginPage/LoginPage";
import TopPage from "./components/topPage/TopPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/userpage" element={<TopPage />}></Route>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
