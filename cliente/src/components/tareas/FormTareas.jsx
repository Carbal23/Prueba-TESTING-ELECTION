import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

export const FormTareas = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto} = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    crearTarea,
    validarTarea,
    obtenerTareas,
    tareaSeleccionada,
    editarTarea,
    limpiarTarea,
  } = tareasContext;

  const [inputValue, setInputValue] = useState({
    name: "",
  });

  useEffect(() => {
    if (tareaSeleccionada) {
      setInputValue(tareaSeleccionada);
    } else {
      setInputValue({
        name: "",
      });
    }
  }, [tareaSeleccionada]);

  if (!proyecto) return null;

  const [proyectoActual] = proyecto;

  const handleOnchange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.name.trim() === "") {
      validarTarea();
      return;
    }

    if (tareaSeleccionada) {
      editarTarea(inputValue);
      limpiarTarea();
      
    } else {
      inputValue.proyecto = proyectoActual._id;
      crearTarea(inputValue);
    }

    obtenerTareas(proyectoActual._id);
    setInputValue({
      name: "",
    });
    
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            name="name"
            placeholder="nombre de tarea..."
            onChange={handleOnchange}
            value={inputValue.name}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value={tareaSeleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">Debes asignar un nombre a la tarea</p>
      ) : null}
    </div>
  );
};
