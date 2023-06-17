import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/auth/authState";
import FormState from "./context/Form/formState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FormState>
        <AlertaState>
          <AuthState>
            <App />
          </AuthState>
        </AlertaState>
    </FormState>
  </React.StrictMode>
);
