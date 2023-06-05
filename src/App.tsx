import React from "react";
//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//ToastFy to show messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Hooks

import { useAuth } from "./hooks/useAuth";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import MyProfile from "./pages/Profile/MyProfile";
import AlterPassword from "./pages/Profile/AlterPassword";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={auth ? <MyProfile /> : <Navigate to="/login" />}
        />
        <Route
          path="/password"
          element={auth ? <AlterPassword /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!auth ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!auth ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
