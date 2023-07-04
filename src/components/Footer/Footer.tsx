import React from "react";
import { NavLink } from "react-router-dom";
//url for logo
import { urlapp } from "../../utils/config";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white flex justify-center text-center items-end h-80">
      <NavLink to="/">
        <img
          width="244"
          height="100"
          src={`${urlapp}/img/logo-top-digital-1-e1655834463510.png`}
          alt="Agiliza Top Digital"
          className="md:cursor-pointer"
        />
      </NavLink>
    </footer>
  );
};

export default Footer;
