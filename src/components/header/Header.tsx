import NavBar from "../NavBarV2/NavBar";
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
