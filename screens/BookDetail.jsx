import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Text, Divider, Button } from 'react-native-paper';
import PrestamoContext from '../context/prestamos/prestamosContext';
import { useNavigation } from '@react-navigation/native';


const DetalleLibro = () => {
  const { libro } = useContext(PrestamoContext);
  const { imagen, autor, nombre, estado, sinopsis } = libro;
  const navigation = useNavigation();

  const ParseBooleanToString = (estado) => {
    if(estado === true){
        return 'Disponible'
    } else {
        return 'No Disponible'
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: imagen }} style={styles.cardCover} />
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={styles.bookName}>
              {nombre}
            </Text>
            <Text style={styles.bookName}>
              {autor}
            </Text>
            <Text variant='titleMedium' style={{ color: estado ? 'green' : 'red', fontWeight: '900', marginBottom: 8}}>
              {ParseBooleanToString(estado)}
            </Text>
            <Divider style={styles.divider} />
            <Text variant="bodyLarge" style={styles.description}>
              {sinopsis}
            </Text>
            {estado && (
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => navigation.navigate('PrestarLibro')}
                >
                  Prestar
                </Button>
              </View>
            )}    
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#F9FCFF',
  },
  cardCover: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  bookName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#E0E0E0',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    margin: 5,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#411f2d',
    elevation: 2,
  },
});

export default DetalleLibro;
