import React from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import firebase from '../firebaseDB';

const AgregarLibros = () => {
    const navigation = useNavigation();

    const librosAgregar = async () => {
        const libros = [
            //FUNCION PARA AGREGAR LIBROS NUEVOS EN CADENA
            {
                autor: "Kerri Maniscalco",
                estado: true,
                imagen: "https://firebasestorage.googleapis.com/v0/b/biblioteca-629a8.appspot.com/o/reinoMaldito.png?alt=media&token=de627e01-4b29-4822-8933-f7f28d6c9fb0",
                nombre: "EL REINO DE LOS MALDITOS",
                sinopsis: "Emilia y su hermana gemela Vittoria son streghe: brujas que viven en secreto entre los humanos, evitando llamar la atención y ser perseguidas. Pero una noche, Vittoria se pierde el turno de la cena en el famoso restaurante siciliano que dirige la familia. De repente, Emilia encuentra el cuerpo de su querida gemela... profanado más allá de lo imaginable. Devastada, planea encontrar al asesino de su hermana y conseguir venganza a cualquier precio, incluso si eso significa usar magia oscura, que lleva mucho tiempo prohibida."
            },
            {
                autor: "Kerri Maniscalco",
                estado: true,
                imagen: "https://firebasestorage.googleapis.com/v0/b/biblioteca-629a8.appspot.com/o/reinoMaldito.png?alt=media&token=de627e01-4b29-4822-8933-f7f28d6c9fb0",
                nombre: "EL REINO DE LOS MALDITOS",
                sinopsis: "Emilia y su hermana gemela Vittoria son streghe: brujas que viven en secreto entre los humanos, evitando llamar la atención y ser perseguidas. Pero una noche, Vittoria se pierde el turno de la cena en el famoso restaurante siciliano que dirige la familia. De repente, Emilia encuentra el cuerpo de su querida gemela... profanado más allá de lo imaginable. Devastada, planea encontrar al asesino de su hermana y conseguir venganza a cualquier precio, incluso si eso significa usar magia oscura, que lleva mucho tiempo prohibida."
            },
            {
                autor: "Kerri Maniscalco",
                estado: true,
                imagen: "https://firebasestorage.googleapis.com/v0/b/biblioteca-629a8.appspot.com/o/reinoMaldito.png?alt=media&token=de627e01-4b29-4822-8933-f7f28d6c9fb0",
                nombre: "EL REINO DE LOS MALDITOS",
                sinopsis: "Emilia y su hermana gemela Vittoria son streghe: brujas que viven en secreto entre los humanos, evitando llamar la atención y ser perseguidas. Pero una noche, Vittoria se pierde el turno de la cena en el famoso restaurante siciliano que dirige la familia. De repente, Emilia encuentra el cuerpo de su querida gemela... profanado más allá de lo imaginable. Devastada, planea encontrar al asesino de su hermana y conseguir venganza a cualquier precio, incluso si eso significa usar magia oscura, que lleva mucho tiempo prohibida."
            },
            {
                autor: "Kerri Maniscalco",
                estado: true,
                imagen: "https://firebasestorage.googleapis.com/v0/b/biblioteca-629a8.appspot.com/o/reinoMaldito.png?alt=media&token=de627e01-4b29-4822-8933-f7f28d6c9fb0",
                nombre: "EL REINO DE LOS MALDITOS",
                sinopsis: "Emilia y su hermana gemela Vittoria son streghe: brujas que viven en secreto entre los humanos, evitando llamar la atención y ser perseguidas. Pero una noche, Vittoria se pierde el turno de la cena en el famoso restaurante siciliano que dirige la familia. De repente, Emilia encuentra el cuerpo de su querida gemela... profanado más allá de lo imaginable. Devastada, planea encontrar al asesino de su hermana y conseguir venganza a cualquier precio, incluso si eso significa usar magia oscura, que lleva mucho tiempo prohibida."
            },
            {
                autor: "Kerri Maniscalco",
                estado: true,
                imagen: "https://firebasestorage.googleapis.com/v0/b/biblioteca-629a8.appspot.com/o/reinoMaldito.png?alt=media&token=de627e01-4b29-4822-8933-f7f28d6c9fb0",
                nombre: "EL REINO DE LOS MALDITOS",
                sinopsis: "Emilia y su hermana gemela Vittoria son streghe: brujas que viven en secreto entre los humanos, evitando llamar la atención y ser perseguidas. Pero una noche, Vittoria se pierde el turno de la cena en el famoso restaurante siciliano que dirige la familia. De repente, Emilia encuentra el cuerpo de su querida gemela... profanado más allá de lo imaginable. Devastada, planea encontrar al asesino de su hermana y conseguir venganza a cualquier precio, incluso si eso significa usar magia oscura, que lleva mucho tiempo prohibida."
            }
        ];

        try {
            for (const libro of libros) {
                await firebase.db.collection('librosTest').add(libro);
            }
            console.log('Libros agregados con éxito');
            
            Alert.alert(
                'Libros agregados con éxito!',
                'Los libros fueron agregados con éxito!',
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            navigation.navigate('BooksCatalog');
                        }
                    }
                ]
            );

        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Button
            onPress={librosAgregar}
            mode="text"
            textColor="#411f2d"
        >
            Agregar Libros
        </Button>
    );
};

export default AgregarLibros;
