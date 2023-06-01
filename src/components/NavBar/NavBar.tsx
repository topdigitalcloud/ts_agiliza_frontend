import { useState } from "react";
//import { useAuth } from "../../hooks/useAuth";
//import useAppDispatch from "../../hooks/useAppDispatch";
//import useAppSelector from "../../hooks/useAppSelector";
//import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";

//Redux

//import { logout, reset, loginSelector } from "../../slices/LoginSlice";
import NavLinks from "./NavLinks";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    //Nav que abraça todo o cabeçalho
    <nav className="bg-white">
      {/* DIV1 principal cabeçalho */}
      <div className="flex items-center w-full font-medium">
        {/* DIV11 que contem a logomarca ou menu modo mobile */}
        <div className="flex-none md:w-auto w-full">
          {/* DIV111 para abraçar a logomarca */}
          <div className="ml-5">
            <img
              src="img/logo-top-digital-agi.png"
              alt="Agiliza Top Digital"
              className="md:cursor-pointer h-12 w-32"
            />
          </div>
          {/* DIV112 visível no modo mobile */}
          <div className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </div>
        </div>
        {/* DIV12 que abraça os itens do Menu */}
        <div className="flex justify-end flex-auto">
          <ul className="hidden md:flex items-center gap-2 font-[Poppins] uppercase">
            <li>
              <NavLink to="/" className="py-7 px-3">
                Home
              </NavLink>
            </li>
            <NavLinks key="nav_desktop" />
          </ul>
        </div>
        {/* DIV13 que está vazia*/}
        <div className="hidden flex-none"></div>
        {/* Mobile Nav */}
        <ul
          className={`
                        md:hidden bg-white z-30 absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${
                          open ? "left-0" : "left-[-100%]"
                        }
                    `}
        >
          <li>
            <NavLink to="/" className="py-7 px-3 inline-block">
              Home
            </NavLink>
          </li>
          <NavLinks key="nav_mobile" />
          <div className="py-5"></div>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
