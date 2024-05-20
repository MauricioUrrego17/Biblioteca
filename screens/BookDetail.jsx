import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Text, Divider, Button } from 'react-native-paper';
import PrestamoContext from '../context/prestamos/prestamosContext';
import { useNavigation } from '@react-navigation/native';


const DetalleLibro = () => {
  const { libro, eliminarLibro } = useContext(PrestamoContext);
  const { imagen, autor, nombre, estado, sinopsis, id } = libro;
  const navigation = useNavigation();

  const ParseBooleanToString = (estado) => {
    if(estado === true){
        return 'Disponible'
    } else {
        return 'No Disponible'
    }
  };

  const confirmacionEliminar = (id) => {
    Alert.alert('Eliminar Libro', '¿Seguro que quieres eliminar el libro?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', 
        onPress: () => {
        eliminarLibro(id)
        Alert.alert('Libro eliminado', 'Libro eliminado de manera exitosa!', [
          {
            text: 'OK',
          },
        ]);
        setTimeout(() => {
          navigation.navigate('BooksCatalog');
        }, 3000);
      }
      },
    ]);
  }

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
            <View style={styles.container}>
              <View style={styles.buttonRow}>
                {estado && (
                  <Button
                    style={styles.button}
                    mode="contained"
                    onPress={() => navigation.navigate('PrestarLibro')}
                  >
                    Prestar
                  </Button>
                )}
                <Button
                  style={styles.buttonDelete}
                  mode="contained"
                  onPress={() => confirmacionEliminar(id)}
                >
                  Eliminar
                </Button>
              </View>
            </View>
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
    height: 300,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  buttonDelete: {
    margin: 1,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: 'red',
    elevation: 2,
  },
});

export default DetalleLibro;
