import { GUARGAR_PEDIDO, SELECCIONAR_LIBROS } from "../../types";

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

        default:
            return state;
    }
}