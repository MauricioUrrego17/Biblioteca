import { GUARGAR_PEDIDO, SELECCIONAR_LIBROS, PRESTAR_LIBRO } from "../../types";

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

        default:
            return state;
    }
}