import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, Searchbar, Title } from 'react-native-paper';
import FirebaseContext from '../context/firebase/firebaseContext';
import PrestamoContext from '../context/prestamos/prestamosContext';

const BorrowedBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { librosPrestados, obtenerLibrosPrestados } = useContext(FirebaseContext); // Utiliza el contexto de Firebase para obtener los datos
  const { seleccionarLibro } = useContext(PrestamoContext);
  const navigation = useNavigation();

  useEffect(() => {
    obtenerLibrosPrestados();
  }, []);

  const filteredCars = librosPrestados.filter((libroPrestado) =>
    libroPrestado.nombreLibro.toLowerCase().includes(searchQuery && searchQuery.toLowerCase()) ||
    libroPrestado.nombre.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())  ||
    libroPrestado.apellido.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())  ||
    libroPrestado.identificacion.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const devolucion = (libro) => {
    if (libro.devolucion === true) {
      return "Devuelto";
    } else {
      return "Sin devolver";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Searchbar
          placeholder="Buscar Libro"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {filteredCars.map((libroPrestado, index) => (
          <React.Fragment key={libroPrestado.id}>
            <Card key={libroPrestado.id} mode="elevated" style={styles.card}>
              <Card.Content>
                <Text variant="titleLarge" style={{marginTop: -10}}>{libroPrestado.nombreLibro}</Text>
                <Text variant="bodyMedium">Autor: {libroPrestado.autorLibro}</Text>
                <Text variant="bodyMedium">Nombre: {libroPrestado.nombre}</Text>
                <Text variant="bodyMedium">Apellido: {libroPrestado.apellido}</Text>
                <Text variant="bodyMedium">Identificacion: {libroPrestado.identificacion}</Text>
                <Text variant="bodyMedium">Devolucion: {devolucion(libroPrestado)}</Text>
              </Card.Content>
              {libroPrestado.devolucion === false && (
                <Card.Actions>
                <Button
                  mode="elevated"
                  buttonColor="#411f2d"
                  textColor="white"
                  onPress={() => {
                    console.log('Libro devuelto' + libroPrestado.orden, libroPrestado.nombre)
                  }}
                >
                  Devolver
                </Button>
              </Card.Actions>
              )}
            </Card>
          </React.Fragment>
        ))}
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained-tonal"
            buttonColor='#ffe29a'
            textColor='white'
            style={styles.button}
            onPress={() => {
              navigation.navigate('BooksCatalog');
            }}
          >
            <Text>Libros</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 10,
    backgroundColor: '#fff',
    color: '#411f2d'
  },
  card: {
    padding: 10,
    marginTop: 5,
    margin: 10,
  },
  button: {
    margin: 5,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#ffe29a',
    elevation: 2,
    width: 250,
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default BorrowedBook;
