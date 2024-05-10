import React, { useReducer } from "react";
import firebase from "../../firebaseDB";
import FirebaseContext from "./firebaseContext";
import FirebaseReducer from "./firebaseReducer";
import { OBTENER_LIBROS_EXITO } from '../../types'
import _ from 'lodash'

const FirebaseState = props => {
    //Crear el estado inicial
    const inicialState = {
        librosCatalogo:[]
    }

    //Definir el use reducer
    const [state, dispatch] = useReducer(FirebaseReducer, inicialState)

    //Consultar productos
    const obtenerLibros = () => {
        //Se hace consulta a firebase
        firebase.db
            .collection('libros')
            .onSnapshot(manejarSnapshot) //Para el manejo de la BD en real time

        function manejarSnapshot(snapshot){
            let libro = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });

            libro = _.sortBy(libro, 'categoriaScrollView')
            dispatch({
                type: OBTENER_LIBROS_EXITO,
                payload: libro
            });
        }
    }

    return(
        <FirebaseContext.Provider 
        value={{
            librosCatalogo: state.librosCatalogo,
            firebase,
            obtenerLibros
        }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )

}

export default FirebaseState