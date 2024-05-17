import React, { useReducer } from "react";
import firebase from "../../firebaseDB";
import PrestamoContext from "./prestamosContext";
import PrestamosReducer from "./prestamosReducer";
import { SELECCIONAR_LIBROS,
        GUARGAR_PEDIDO,
        PRESTAR_LIBRO } 
        from "../../types";

const PrestamoState = props => {
    //Crear el estado inicial
    const inicialState = {
        prestamo:[],
        libro: null,
    }

    //Definir el use reducer
    const [state, dispatch] = useReducer(PrestamosReducer, inicialState)

    //SELECCIONAR EL PRODUCTO Y OBTENER EL PRODUCTO
    const seleccionarLibro = libro => {
        dispatch({
            type: SELECCIONAR_LIBROS,
            payload: libro
        })
    } 

    const guardarPedido = prestamo => {
        dispatch({
            type: GUARGAR_PEDIDO,
            payload: prestamo
        })
    }

    const prestarLibro = async id => {
        try {
            //Actualizar el estado del libro en firebase
            await firebase.db.collection('libros').doc(id).update({ estado: false });

            dispatch({
                type: PRESTAR_LIBRO,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <PrestamoContext.Provider 
        value={{
            prestamo: state.prestamo,
            libro: state.libro,
            seleccionarLibro,
            guardarPedido,
            prestarLibro
        }}
        >
            {props.children}
        </PrestamoContext.Provider>
    )

}

export default PrestamoState