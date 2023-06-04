import React, { useReducer } from "react";
import reducer from "./proyectoReducer";
import proyectoContext from "./proyectoContext";
import {
  AGREGAR_PROYECTO,
  ELIMINAR_PROYECTO,
  OBTENER_PROYECTO,
  PROYECTO_ACTUAL,
  PROYECTO_ERROR,
  RESET_VALIDAR,
  SET_FORMULARIO,
  VALIDAR_PROYECTO,
} from "../../types";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  const initialSatate = {
    proyectos: [],
    formulario: false,
    errorValidar: false,
    proyecto: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(reducer, initialSatate);

  const mostrarFormulario = () => {
    dispatch({
      type: SET_FORMULARIO,
    });
  };

  const obtenerProyectos = async () => {
    try {
      const peticion = await clienteAxios.get("/api/proyecto");
      console.log(peticion);

      dispatch({
        type: OBTENER_PROYECTO,
        payload: peticion.data.proyectos,
      });
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const agregarProyecto = async (proyecto) => {
    console.log(proyecto);
    try {
      const peticion = await clienteAxios.post("/api/proyecto", proyecto);
      console.log(peticion);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: peticion.data,
      });
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const validarProyecto = () => {
    dispatch({
      type: VALIDAR_PROYECTO,
    });
  };

  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyecto/${proyectoId}`);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      console.log(error.response.data);
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  const resetValidar = () => {
    dispatch({
      type: RESET_VALIDAR,
    });
  };


  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorValidar: state.errorValidar,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        validarProyecto,
        proyectoActual,
        eliminarProyecto,
        resetValidar,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
