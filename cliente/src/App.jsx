import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/auth/Login";
import tokenAuth from "./config/tokenAuth";
import AuthContext from "./context/auth/authContext";
import { ContainerForm } from "./components/form/ContainerForm";

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
        <Route
          exact
          path="/proyectos"
          element={
            !autenticado ? (
              <Navigate to="/" replace />
            ) : (
              <ContainerForm />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
