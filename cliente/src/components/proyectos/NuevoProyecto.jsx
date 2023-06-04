import React, { useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

export const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorValidar, mostrarFormulario, agregarProyecto, validarProyecto } = proyectosContext;
  const [inputValue, setInputValue] = useState({
    name: "",
  });

  const handleOnchange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputValue.name.trim() === ""){
      validarProyecto();
      return;

    } 

    agregarProyecto(inputValue);
    setInputValue({
      name:"",
    })
  };

  return (
    <>
      <button 
      className="btn btn-primario btn-block" 
      type="butto"
      onClick={()=>mostrarFormulario()}
      >
        Nuevo Proyecto{" "}
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            name="name"
            placeholder="Nombre del Proyecto"
            onChange={handleOnchange}
            value={inputValue.name}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="agregar proyecto"
          />
        </form>
      ) : null}
      {errorValidar? <p className="mensaje error">Debes asignar un nombre al proyecto</p> : null }
    </>
  );
};
