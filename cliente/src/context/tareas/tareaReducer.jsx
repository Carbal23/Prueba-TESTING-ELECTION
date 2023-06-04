import {
  CREAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  LIMPIAR_TAREA,
  TAREAS_PROYECTO,
  TAREA_SELECCIONADA,
  VALIDAR_TAREA,
} from "../../types";

const reducer = (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasProyecto: action.payload,
      };

    case CREAR_TAREA:
      return {
        ...state,
        tareasProyecto: [action.payload, ...state.tareasProyecto],
        errorTarea: false,
      };

    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.filter((tarea) => tarea._id !== action.payload),
        tareaSeleccionada: null,
        errorTarea: false,
      };
    case EDITAR_TAREA:
      return {
        ...state,
        tareasProyecto: state.tareasProyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
        errorTarea: false,
      };

    case TAREA_SELECCIONADA:
      return {
        ...state,
        tareaSeleccionada: action.payload,
        errorTarea: false,
      };

    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaSeleccionada: null,
        errorTarea:false,
      };

    default:
      return state;
  }
};

export default reducer;
