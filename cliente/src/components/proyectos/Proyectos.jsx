import React, { useContext, useEffect } from "react";
import { SideBar } from "../layout/SideBar";
import { Header } from "../layout/Header";
import { FormTareas } from "../tareas/FormTareas";
import { ListadoTareas } from "../tareas/ListadoTareas";
import AuthContext from "../../context/auth/authContext";

export const Proyectos = () => {

  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;
  
  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <Header />
        <main>
          <FormTareas />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
};
