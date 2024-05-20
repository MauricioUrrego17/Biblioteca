import { GUARGAR_PEDIDO, SELECCIONAR_LIBROS, PRESTAR_LIBRO, DEVOLVER_LIBRO, ELIMINAR_LIBRO } from "../../types";

export default (state, action) => {

    switch(action.type){
        case SELECCIONAR_LIBROS:
            return{
                ...state,
                libro: action.payload
            }

        case GUARGAR_PEDIDO:
            return{
                ...state,
                prestamo: action.payload
            }

        case PRESTAR_LIBRO:
            return {
                ...state,
                prestamo: state.prestamo.map(libro =>
                    libro.id === action.payload ? { ...libro, estado: false } : libro
                )
            }

        case DEVOLVER_LIBRO:
            return{
                ...state,
                prestamos: action.payload,
                libro: action.payload
            }

        case ELIMINAR_LIBRO:
            return{
                ...state,
                libro: action.payload
            }

        default:
            return state;
    }
}