import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

export const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { obtenerTareas, limpiarTarea} = tareasContext;

  const onClickProyecto = () => {
    proyectoActual(proyecto._id);
    obtenerTareas(proyecto._id);
    limpiarTarea();
  };
  
  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={onClickProyecto}>
        {proyecto.name}
      </button>
    </li>
  );
};
