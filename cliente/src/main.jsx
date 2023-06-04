import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/auth/authState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <App />
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  </React.StrictMode>
);
