import { OBTENER_LIBROS_EXITO, OBTENER_LIBROS_PRESTADOS } from "../../types";

export default (state, action) => {
    switch(action.type){
        case OBTENER_LIBROS_EXITO:
            return{
                ...state,
                librosCatalogo: action.payload
            }

        case OBTENER_LIBROS_PRESTADOS:
            return{
                ...state,
                librosPrestados: action.payload
            }

        default:
            return state;
    }
}