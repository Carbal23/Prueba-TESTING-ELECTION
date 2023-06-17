import { useReducer } from "react";
import AuthContext from "./authContext";
import reducer from "./authReducer";
import {
    CERRAR_SESION,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
} from "../../types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("TOKEN"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //registrar usuario en la base de datos

  //iniciar sesion
  const iniciarSesion = async (datos) => {
    try {
      const peticion = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: peticion.data,
      });

      //OBTENER usuario autenticado
      setTimeout(() => {
        //obtener usuario
        usuarioAutenticado();
      }, 2000);
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //cerrar sesion
  const cerrarSesion = ()=>{
    dispatch({
        type: CERRAR_SESION,
    })
  }

  //retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      tokenAuth(token);
    }

    try {
      const peticion = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: peticion.data.coordinator,
      });
      //
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
