import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/auth/authContext";

export const Register = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  useEffect(() => {
    if (autenticado) {
      navigate("/proyectos");
      
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado]);

  const { name, email, password, confirmarPassword } = inputValue;

  const handleOnchange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //validar que no hay campos vacios
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmarPassword.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //password minimo de 6 caractes
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe contener minimo 6 caracteres",
        "alerta-error"
      );
      return;
    }

    // los 2 password sean iguales
    if (password !== confirmarPassword) {
      mostrarAlerta("El password no coincide", "alerta-error");
      return;
    }

    //pasarlo al action
    registrarUsuario({
      name,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Registrate</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Tu Nombre"
              name="name"
              onChange={handleOnchange}
              value={name}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu Correo Electronico"
              name="email"
              onChange={handleOnchange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="pasword"
              placeholder="Tu contraseña"
              name="password"
              onChange={handleOnchange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar-password">confirmar Password</label>
            <input
              type="password"
              id="confirmarPassword"
              placeholder="Confirma tu contraseña"
              name="confirmarPassword"
              onChange={handleOnchange}
              value={confirmarPassword}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              value="Registrarse"
              className="btn btn-primary btn-block"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta">
          Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};
