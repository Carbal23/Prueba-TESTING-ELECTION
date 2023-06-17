import React, { useReducer } from "react";
import AlertaContext from "./alertaContext";
import reducer from "./alertaReducer";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const mostrarAlerta = (alerta) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg: alerta.msg,
        categoria: alerta.categoria
      },
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <AlertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  );
};

export default AlertaState;
