import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";

//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
//import useAppSelector from "../../hooks/useAppSelector";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

//Login slice
import { logout, reset, loginSelector } from "../../slices/LoginSlice";
import NavLinks from "./NavLinks";

function NavBar() {
  //Auth status
  const { auth } = useAuth();

  console.log(auth);

  //State of mobile menu
  const [open, setOpen] = useState(false);

  //dispatch for logout
  const dispatch = useAppDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    //Nav que abraça todo o cabeçalho
    <nav className="bg-white">
      {/* DIV1 principal cabeçalho */}
      <div className="flex items-center justify-around font-medium">
        {/* DIV11 que contem a logomarca ou menu modo mobile */}
        <div className="flex justify-between md:w-auto w-full z-50 p-5">
          {/* DIV111 para subir um pouco a logo */}
          <div className="mb-3">
            <NavLink to="/">
              <img
                src="img/logo-top-digital-agi.png"
                alt="Agiliza Top Digital"
                className="md:cursor-pointer h-12 w-32"
              />
            </NavLink>
          </div>
          {/* DIV112 visível no modo mobile */}
          <div
            className="text-3xl md:hidden mt-5"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="" /> : <Menu />}
          </div>
        </div>
        {/* DIV12 que abraça os itens do Menu */}
        <div>
          <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
            {auth ? (
              <li>
                <NavLink to="/" className="py-7 px-3 inline-block">
                  Home
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" className="py-7 px-3 inline-block">
                    Cadastro
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="py-7 px-3 inline-block">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <NavLinks key="nav_desktop" auth={auth} />
            {auth && (
              <li>
                <form>
                  <button
                    onClick={handleLogout}
                    className="py-7 px-3 inline-block font-[Poppins] uppercase"
                  >
                    Logout
                  </button>
                </form>
              </li>
            )}
          </ul>
        </div>
        {/* DIV13 que está vazia*/}
        <div className="md:block hidden"></div>
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
          <NavLinks key="nav_mobile" auth={auth} />
          <div className="py-5"></div>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
