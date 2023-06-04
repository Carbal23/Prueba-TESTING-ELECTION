import React, { useContext } from "react";
import { Tarea } from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const ListadoTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasProyecto, limpiarTarea } = tareasContext;

  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  if (!tareasProyecto) return <p>No hay tareas</p>;

  const onclickEliminar = () => {
    eliminarProyecto(proyecto[0]._id);
    limpiarTarea();

  };

  return (
    <>
      <h2>{proyecto[0].name}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tare">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
             <CSSTransition
             key={tarea._id}
             timeout={200}
             classNames="tarea"
             >
               <Tarea tarea={tarea} />
             </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        className="btn btn-primario"
        type="button"
        onClick={onclickEliminar}
      >
        Eliminar proyecto &times;
      </button>
    </>
  );
};
