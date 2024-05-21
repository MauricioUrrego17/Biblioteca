import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Text, Divider, Button, TextInput } from 'react-native-paper';
import PrestamoContext from '../context/prestamos/prestamosContext';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebaseDB';

const PrestarLibro = () => {
    const { libro, prestarLibro } = useContext(PrestamoContext);
    const { id, nombre, autor } = libro;
    const navigation = useNavigation();
    const [nombreEstudiante, setnombreEstudiante] = useState('')
    const [apellidoEstudiante, setapellidoEstudiante] = useState('')
    const [identificaciónEstudiante, setidentificaciónEstudiante] = useState('')

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const libroPrestado = (nombreEstudiante, apellidoEstudiante, identificaciónEstudiante) => {
        Alert.alert('Prestar Libro',
        '¿Estas seguro que deseas prestar el libro?',
        [{
            text: 'Confirmar',
            onPress: async () => {
                //Crear un objeto con toda la informacion
                const libroObj = {
                    devolucion: false,
                    fechaPrestado: formatDate(Date.now()),
                    nombreLibro: nombre,
                    autorLibro: autor,
                    idLibro: id,
                    nombre: nombreEstudiante,
                    apellido: apellidoEstudiante,
                    identificacion: identificaciónEstudiante
                }

                //Enviar a Firebase
                try{
                    const pedido = await firebase.db.collection('prestamoLibro').add(libroObj)
                    console.log('Libro prestado con exito ' + nombre, pedido.id)
                   
                    Alert.alert(
                        'Libro prestado con éxito!',
                        'El libro fue prestado con Exito!',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    navigation.navigate('BooksCatalog');
                                }
                            }
                        ]
                    );

                } catch(error) {
                    console.log(error)
                }
            }    
        },
        {
            text: 'Cancelar'
        }
        ])
    }

    return (
        <View style={styles.container}>
           <Text variant='titleLarge' style={styles.input}>Libro a prestar</Text>
           <Text variant='headlineMedium'style={styles.input} >{nombre}</Text>
           <Text variant='headlineSmall' style={styles.input}>{autor}</Text>
            <TextInput
                style={styles.input}
                label="Nombre"
                mode="outlined"
                outlineColor="#411f2d"
                activeOutlineColor="#ffe29a"
                keyboardType="ascii-capable"
                value={nombreEstudiante}
                onChangeText={setnombreEstudiante}
            />
             <TextInput
                style={styles.input}
                label="Apellido"
                mode="outlined"
                outlineColor="#411f2d"
                activeOutlineColor="#ffe29a"
                keyboardType="ascii-capable"
                value={apellidoEstudiante}
                onChangeText={setapellidoEstudiante}
            />
            <TextInput
                style={styles.input}
                label="Número de identificación"
                mode="outlined"
                outlineColor="#411f2d"
                activeOutlineColor="#ffe29a"
                keyboardType="numeric"
                value={identificaciónEstudiante}
                onChangeText={setidentificaciónEstudiante}
            />  
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={() => {
                        prestarLibro(id);
                        libroPrestado(nombreEstudiante, apellidoEstudiante, identificaciónEstudiante);
                    }}
                >
                    Prestar
                </Button>
            </View>
        </View>
    );
}   

export default PrestarLibro

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    input: {
        margin: 5,
        borderRadius: 20,
    },

    button: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 24,
        backgroundColor: '#411f2d',
        elevation: 2,
        width: 200,
    },
    buttonContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})