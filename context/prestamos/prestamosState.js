import React, { useReducer } from "react";
import firebase from "../../firebaseDB";
import PrestamoContext from "./prestamosContext";
import PrestamosReducer from "./prestamosReducer";
import { SELECCIONAR_LIBROS,
        GUARGAR_PEDIDO,
        PRESTAR_LIBRO,
        DEVOLVER_LIBRO,
        ELIMINAR_LIBRO } 
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

    const eliminarLibro = async id => {
        try {
            await firebase.db.collection('libros').doc(id).delete();
            console.log('Libro Eliminado')
            dispatch({
                type: ELIMINAR_LIBRO,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const devolverLibro = async (id, idLibro) => {
        try{
            await firebase.db.collection('prestamoLibro').doc(id).update({ devolucion: true }) 
            
             // Buscar el libro en la colección 'libros' con el id especificado en 'orden'
             const libroDoc = await firebase.db.collection('libros').doc(idLibro).get();
    
             if (libroDoc.exists) {
                 // Actualizar el estado del libro a true
                 await firebase.db.collection('libros').doc(idLibro).update({ estado: true });
                 console.log('Se ha cambiado el estado del libro')
             } else {
                 console.log('No se encontró el libro con el id especificado en orden.');
             }

            dispatch({
                type: DEVOLVER_LIBRO,
                payload: id, idLibro
            })

        } catch(error) {
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
            prestarLibro,
            devolverLibro,
            eliminarLibro
        }}
        >
            {props.children}
        </PrestamoContext.Provider>
    )

}

export default PrestamoState