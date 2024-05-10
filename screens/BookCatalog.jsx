import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
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

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const marcaAnterior = filteredCars[i - 1].categoria;
      if (marcaAnterior !== categoria) {
        return <Title>{categoria}</Title>;
      }
    }
    return null;
  };

  return (
    <ScrollView>
      <Searchbar
        placeholder="Buscar Libro"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      {filteredCars.map((libro, index) => (
        <React.Fragment key={libro.id}>
          {mostrarHeading(libro.categoria, index)}
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
  );
};

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    backgroundColor: '#fff',
    color: '#411f2d'
  },
  card: {
    margin: 10,
  },
  cardImage: {
    margin: 10,
  },
});

export default BooksCatalog;
