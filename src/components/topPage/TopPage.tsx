import React, { useEffect } from "react";
import Header from "../common/Header";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/storeType";

const TopPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <div></div>
    </>
  );
};

export default TopPage;
