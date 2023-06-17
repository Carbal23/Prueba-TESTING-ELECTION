import {
  CERRAR_SESION,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
} from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
      localStorage.setItem("TOKEN", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        token: localStorage.getItem("TOKEN"),
        cargando: false,
      };

    case CERRAR_SESION:
    case LOGIN_ERROR:
      localStorage.removeItem("TOKEN");
      return {
        ...state,
        token: null,
        autenticado: null,
        usuario: null,
        mensaje: action.payload,
        cargando: false,
      };

    default:
      return state;
  }
};

export default reducer;
