import React, { useContext, useEffect } from "react";
import { Header } from "../layout/Header";
import AuthContext from "../../context/auth/authContext";
import { NuevoForm } from "./NuevoForm";

export const ContainerForm = () => {

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;
  
  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div className="contenedor-app">
      <div className="seccion-principal">
        <Header />
        <main>
          <NuevoForm/>
          <div className="contenedor-tareas">
          </div>
        </main>
      </div>
    </div>
  );
};
