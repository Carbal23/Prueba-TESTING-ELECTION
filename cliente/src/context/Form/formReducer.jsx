import {
  AGREGAR_FORM,
  FORM_ERROR,
  OBTENER_CONDADOS,
  OCULTAR_MENSAJE,
} from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case AGREGAR_FORM:
      return {
        ...state,
        mensaje: action.payload,
      };

    case FORM_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case OBTENER_CONDADOS:
      return {
        ...state,
        county: action.payload,
      };

    case OCULTAR_MENSAJE:
      return {
        ...state,
        mensaje: null,
      };
    default:
      return state;
  }
};

export default reducer;
