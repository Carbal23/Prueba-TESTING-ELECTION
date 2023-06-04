import React, { useReducer } from "react";
import reducer from "./tareaReducer";
import tareaContext from "./tareaContext";
import {
  CREAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  LIMPIAR_TAREA,
  TAREAS_PROYECTO,
  TAREA_SELECCIONADA,
  VALIDAR_TAREA,
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  const obtenerTareas = async (proyecto) => {
    try {
      const peticion = await clienteAxios.get("/api/tarea", {
        params: { proyecto },
      });
      console.log(peticion.data.tareas);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: peticion.data.tareas,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const peticion = await clienteAxios.post("/api/tarea", tarea);
      console.log(peticion);
      dispatch({
        type: CREAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tarea/${id}`, {
        params: { proyecto }
      });

      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const tareaSeleccionadaEdit = (tarea) => {
    dispatch({
      type: TAREA_SELECCIONADA,
      payload: tarea,
    });
  };

  const editarTarea = async (tarea) => {
    console.log(tarea);
    try {
      const peticion = await clienteAxios.put(`/api/tarea/${tarea._id}`,tarea);
      console.log(peticion);
      dispatch({
        type: EDITAR_TAREA,
        payload: peticion.data.tarea,
      });
      
    } catch (error) {
      console.log(error.response.data)
    }
   
  };

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <tareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        crearTarea,
        validarTarea,
        eliminarTarea,
        tareaSeleccionadaEdit,
        editarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
