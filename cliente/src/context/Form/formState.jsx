import React, { useReducer } from "react";
import reducer from "./formReducer";
import formContext from "./formContext";
import {
  AGREGAR_FORM,
  FORM_ERROR,
  OBTENER_CONDADOS,
  OCULTAR_MENSAJE,
} from "../../types";
import clienteAxios from "../../config/axios";

const FormState = (props) => {
  const initialSatate = {
    mensaje: null,
    county: [],
  };

  const [state, dispatch] = useReducer(reducer, initialSatate);

  const agregarForm = async (form) => {
    console.log(form);
    try {
      await clienteAxios.post("/api/election", form);
      const ok = {
        msg: "Formulario enviado con exito",
        categoria: "alerta alerta-ok"
      }
      // mostrarAlerta(ok)
      dispatch({
        type: AGREGAR_FORM,
        payload: ok,
      });
      setTimeout(() => {
        dispatch({
          type: OCULTAR_MENSAJE,
        });
      }, 5000);
    
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: FORM_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerCondados = async () => {
    try {
      const peticion = await clienteAxios.get("/api/county");

      dispatch({
        type: OBTENER_CONDADOS,
        payload: peticion.data.county,
      });
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: FORM_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <formContext.Provider
      value={{ 
        mensaje: state.mensaje,
        county: state.county,
        agregarForm,
        obtenerCondados,
      }}
    >
      {props.children}
    </formContext.Provider>
  );
};

export default FormState;
