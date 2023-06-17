import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import proyectoContext from "../../context/Form/formContext";

export const Header = () => {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

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
