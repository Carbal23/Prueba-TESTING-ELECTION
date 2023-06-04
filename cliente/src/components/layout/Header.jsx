import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  const ProyectoContext = useContext(proyectoContext);
  let { proyecto } = ProyectoContext;

  useEffect(() => {
    usuarioAutenticado();
    
  }, []);

  return (
    <header className="app-header">
        {usuario? <p className="nombre-usuario">
        Hola <span>{usuario.name}</span>
      </p> : null}
      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-sesion"
        onClick={()=>{
            cerrarSesion();
            window.location.reload()
        }}>Cerrar sesion</button>
      </nav>
    </header>
  );
};
