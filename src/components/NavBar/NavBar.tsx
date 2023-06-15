import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";

//url for logo
import { urlapp } from "../../utils/config";

//Hooks
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useNotify } from "../../hooks/useNotify";

//Login slice
import { logout, loginSelector, reset } from "../../slices/LoginSlice";
import NavLinks from "./NavLinks";

function NavBar() {
  //Auth status
  const { auth } = useAuth();

  //State of mobile menu
  const [open, setOpen] = useState<boolean>(false);

  //dispatch for logout
  const dispatch = useAppDispatch();
  const { success } = useAppSelector(loginSelector);

  //notify thanks for use agiliza
  const notify = useNotify();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  //show success message and clean all auth states
  useEffect(() => {
    if (success) {
      notify("Obrigado por utilizar o agliza!", "N");
    }
    dispatch(reset());
    return;
  }, [dispatch, success, notify]);

  return (
    //Nav que abraça todo o cabeçalho
    <nav className="bg-top-digital bg-opacity-25">
      {/* DIV1 principal cabeçalho */}
      <div className="flex items-center justify-around text-base font-top-digital-nav border-b-[1px] border-top-digital">
        {/* DIV11 que contem a logomarca ou menu modo mobile */}
        <div className="flex justify-between md:w-auto w-full z-50 p-5">
          {/* DIV111 para subir um pouco a logo */}
          <div className="mb-3">
            <NavLink to="/">
              <img
                src={`${urlapp}/img/logo-top-digital-agi.png`}
                alt="Agiliza Top Digital"
                className="md:cursor-pointer h-12 w-32"
              />
            </NavLink>
          </div>
          {/* DIV112 visível no modo mobile */}
          <div className="text-normal md:hidden mt-5" onClick={() => setOpen(!open)}>
            {open ? <X className="" /> : <Menu />}
          </div>
        </div>
        {/* DIV12 que abraça os itens do Menu */}

        <ul className="md:flex hidden items-center gap-8">
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
          <NavLinks key="nav_desktop" auth={auth} open={open} setOpen={setOpen} />
          {auth && (
            <li>
              <form>
                <button
                  onClick={handleLogout}
                  className="py-7 px-3 inline-block text-top-digital-link-color hover:text-top-digital-link-hover"
                >
                  Logout
                </button>
              </form>
            </li>
          )}
        </ul>

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
            <NavLink to="/" onClick={() => setOpen(!open)} className="py-7 px-3 inline-block">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" onClick={() => setOpen(!open)} className="py-7 px-3 inline-block">
              Cadastro
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" onClick={() => setOpen(!open)} className="py-7 px-3 inline-block">
              Login
            </NavLink>
          </li>

          <NavLinks auth={auth} open={open} setOpen={setOpen} />
          <div className="py-5"></div>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
