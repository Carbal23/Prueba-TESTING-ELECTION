import React, { useContext, useEffect, useState } from "react";
import formContext from "../../context/Form/formContext";
import AlertaContext from "../../context/alertas/alertaContext";

export const NuevoForm = () => {
  const FormContext = useContext(formContext);
  const { agregarForm, obtenerCondados, county, mensaje} = FormContext;
  const alertaContext = useContext(AlertaContext);
  const {alerta, mostrarAlerta} = alertaContext;
  const [inputValue, setInputValue] = useState({
    año: "",
    partidoPolitico: "",
    condado: "",
    conteoVotos: "",
  });

  const { año, partidoPolitico, condado, conteoVotos } = inputValue;

  useEffect(() => {
    obtenerCondados();
  }, []);

  const handleOnchange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      año.trim() === "" ||
      partidoPolitico.trim() === "" ||
      condado.trim() === "" ||
      conteoVotos.trim() === ""
    ) {
      const alerta = {
        msg: "Todos los campos son obligatorios",
        categoria:"alerta alerta-error"
      };
      mostrarAlerta(alerta);

      return;
    }

    agregarForm(inputValue);
    console.log(inputValue);
    setInputValue({
      año: "",
      partidoPolitico: "",
      condado: "",
      conteoVotos: "",
    });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Election</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Año</label>
                <select
                  name="año"
                  className="form-control"
                  onChange={handleOnchange}
                  value={año}
                >
                  <option value="">-Elige el año-</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Partido Politico</label>
                <select
                  name="partidoPolitico"
                  className="form-control"
                  onChange={handleOnchange}
                  value={partidoPolitico}
                >
                  <option value="">-Elige in partido politico-</option>
                  <option value="de la union">liberal</option>
                  <option value="radical">radical</option>
                  <option value="izquierda">izquierda</option>
                  <option value="conservador">conservador</option>
                  <option value="democratico">democratico</option>
                  <option value="comunista">comunista</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Condado</label>
                <select
                  name="condado"
                  id=""
                  className="form-control"
                  onChange={handleOnchange}
                  value={condado}
                >
                  <option value="">-Elige el condado-</option>
                  {county.map((County) => (
                    <option key={County._id} value={County.county}>
                      {County.county}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">votos totales</label>
                <input
                  type="number"
                  placeholder="numero de votos"
                  className="form-control"
                  name="conteoVotos"
                  onChange={handleOnchange}
                  value={conteoVotos}
                />
              </div>
              <input
                type="submit"
                className="btn btn-primario btn-block text-uppercase"
                value="agregar proyecto"
              />
            </form>
            <div className="d-flex justify-content-center"></div>
          </div>
        </div>
      </div>
      {alerta? <p className={alerta.categoria}>{alerta.msg}</p> : null}
      {mensaje? <p className={mensaje.categoria}>{mensaje.msg}</p> : null}
    </div>
  );
};
