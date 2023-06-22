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
import Upload from "./pages/Upload/Upload";
import ConfigStation from "./pages/ConfigStation/ConfigStation";
import ConfigSystem from "./pages/ConfigSystem/ConfigSystem";
//import Site from "./pages/Site/Site";
import StationPage from "./pages/StationPage/StationPage";
import Footer from "./components/Footer/Footer";
import DocType from "./pages/DocType/DocType";

//context //context
import { ContextSystemProvider } from "./contexts/ContextSystem";

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
        <Route path="/profile" element={auth ? <MyProfile /> : <Navigate to="/login" />} />
        <Route path="/configstation" element={auth ? <ConfigStation /> : <Navigate to="/login" />} />
        <Route path="/configsystem" element={auth ? <ConfigSystem /> : <Navigate to="/login" />} />
        <Route path="/upload" element={auth ? <Upload /> : <Navigate to="/login" />} />
        <Route path="/doctype" element={auth ? <DocType /> : <Navigate to="/login" />} />
        <Route
          path="/stationpage/:id"
          element={
            auth ? (
              <ContextSystemProvider>
                <StationPage />
              </ContextSystemProvider>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/password" element={auth ? <AlterPassword /> : <Navigate to="/login" />} />
        <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
