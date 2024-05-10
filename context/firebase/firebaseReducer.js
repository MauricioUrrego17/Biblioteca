import { OBTENER_LIBROS_EXITO } from "../../types";

export default (state, action) => {
    switch(action.type){
        case OBTENER_LIBROS_EXITO:
            return{
                ...state,
                librosCatalogo: action.payload
            }

        default:
            return state;
    }
}