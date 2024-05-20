import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, Searchbar, Title } from 'react-native-paper';
import FirebaseContext from '../context/firebase/firebaseContext';
import PrestamoContext from '../context/prestamos/prestamosContext';

const BooksCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { librosCatalogo, obtenerLibros } = useContext(FirebaseContext); // Utiliza el contexto de Firebase para obtener los datos
  const { seleccionarLibro } = useContext(PrestamoContext);
  const navigation = useNavigation();

  useEffect(() => {
    obtenerLibros();
  }, []);

  const filteredCars = librosCatalogo.filter((libro) =>
    libro.nombre.toLowerCase().includes(searchQuery && searchQuery.toLowerCase()) ||
    libro.autor.toLowerCase().includes(searchQuery && searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Buscar Libro"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <Button
          mode="contained-tonal"
          buttonColor='#ffe29a'
          textColor='white'
          style={styles.headerButton}
          onPress={() => {
            navigation.navigate('BorrowedBook');
          }}
        >
          <Text>Libros Prestados</Text>
        </Button>
      </View>
      <ScrollView>
        {filteredCars.map((libro, index) => (
          <React.Fragment key={libro.id}>
            <Card key={libro.id} mode="outlined" style={styles.card}>
              <Card.Content>
                <Text variant="titleLarge">{libro.nombre}</Text>
                <Text variant="bodyMedium">Autor: {libro.autor}</Text>
              </Card.Content>
              <Card.Cover source={{ uri: libro.imagen }} style={styles.cardImage} />
              <Card.Actions>
                <Button
                  mode="elevated"
                  buttonColor="#411f2d"
                  textColor="white"
                  onPress={() => {
                    seleccionarLibro(libro);
                    navigation.navigate('BookDetail');
                  }}
                >
                  Más información
                </Button>
              </Card.Actions>
            </Card>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#fff',
    color: '#411f2d',
  },
  headerButton: {
    marginLeft: 10,
  },
  card: {
    margin: 10,
  },
  cardImage: {
    margin: 10,
    height: 300,
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
    justifyContent: 'center',
  },
});

export default BooksCatalog;
