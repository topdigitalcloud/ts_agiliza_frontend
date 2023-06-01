import React from "react";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { loginSelector, logout } from "../../slices/LoginSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  const { user } = useAppSelector(loginSelector);

  return (
    <>
      {user && (
        <>
          <div>Hello {user!._id}</div>
          <form>
            <button onClick={handleLogout} className="bg-slate-800 text-white">
              Logout
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Home;
