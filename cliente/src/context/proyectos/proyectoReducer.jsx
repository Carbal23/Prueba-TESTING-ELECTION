import {
  OBTENER_PROYECTO,
  SET_FORMULARIO,
  AGREGAR_PROYECTO,
  VALIDAR_PROYECTO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  RESET_VALIDAR,
  PROYECTO_ERROR,
} from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_FORMULARIO:
      if (state.formulario) {
        return {
          ...state,
          formulario: false,
          errorValidar: false,
        };
      } else {
        return {
          ...state,
          formulario: true,
          errorValidar: false,
        };
      }

    case OBTENER_PROYECTO:
      return {
        ...state,
        proyectos: action.payload,
      };

    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        errorValidar: false,
      };

    case VALIDAR_PROYECTO:
      return {
        ...state,
        errorValidar: true,
      };

    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
      };

    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        proyecto: null,
        errorValidar: false,
      };

    case RESET_VALIDAR:
      return {
        ...state,
        errorValidar: false,
      };

      case PROYECTO_ERROR:
        return{
          ...state,
          mensaje: action.payload,
        }

    default:
      return state;
  }
};

export default reducer;
