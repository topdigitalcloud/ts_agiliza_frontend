import React from "react";
import NavBar from "../NavBar/NavBar";
//ToastFy to show messages
import { ToastContainer } from "react-toastify";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <ToastContainer />
      <NavBar />
    </header>
  );
};

export default Header;
