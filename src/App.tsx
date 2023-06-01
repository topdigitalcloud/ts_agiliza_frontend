import React from "react";
//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Hooks

import { useAuth } from "./hooks/useAuth";

//Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
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
