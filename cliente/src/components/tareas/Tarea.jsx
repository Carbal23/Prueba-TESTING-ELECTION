import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

export const Tarea = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, editarTarea, tareaSeleccionadaEdit } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const onClickEliminar = () => {
    eliminarTarea(tarea._id, proyecto[0]._id);
    obtenerTareas(proyecto[0]._id);
  };

  const cambiarEstadoTarea = () => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    editarTarea(tarea);
  };

  const EditarTarea = ()=>{
    tareaSeleccionadaEdit(tarea);

  }

  return (
    <>
      <li className="tarea sombra">
        <p>{tarea.name}</p>
        <div className="estado">
          {tarea.estado ? (
            <button
              className="completo"
              type="button"
              onClick={cambiarEstadoTarea}
            >
              Completo
            </button>
          ) : (
            <button
              className="incompleto"
              type="button"
              onClick={cambiarEstadoTarea}
            >
              Incompleto
            </button>
          )}
        </div>
        <div className="acciones">
          <button 
          type="button" 
          className="btn btn-primario"
          onClick={EditarTarea}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn btn-secundario"
            onClick={onClickEliminar}
          >
            Eliminar
          </button>
        </div>
      </li>
    </>
  );
};
