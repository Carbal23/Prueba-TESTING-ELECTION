import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Proyectos } from "./components/proyectos/proyectos";
import tokenAuth from "./config/tokenAuth";
import AuthContext from "./context/auth/authContext";

function App() {
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  //REVISAr si tenemos token
  const token = localStorage.getItem("TOKEN");
  if (token) {
    tokenAuth(token);
  }

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/proyectos"
          element={
            !autenticado ? (
              <Navigate to="/" replace />
            ) : (
              <Proyectos />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
