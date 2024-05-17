import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import Home from './screens/Home'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import firebase from './firebaseDB';
import FirebaseState from './context/firebase/firebaseState';
import PrestamoState from './context/prestamos/prestamosState';
import BooksCatalog from './screens/BookCatalog';
import BookDetail from './screens/BookDetail';
import PrestarLibro from './screens/LendBook';
import BorrowedBook from './screens/BorrowedBooks';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const testDatabaseConnection = async () => {
      try {
        await firebase.db;
        console.log('Conexión a la base de datos exitosa');
      } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
      }
    };

    testDatabaseConnection();
  }, []);


  return (
    <FirebaseState>
      <PrestamoState>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle:{
                backgroundColor: '#ffe29a'
              },
              headerTitleStyle:{
                fontWeight: 'bold',
                color: '#411f2d',
              },

              //Se ha habilitado la navegación por gestos deslizando horizontalmente.
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              headerTitleAlign: 'left'
            }}>
            <Stack.Screen name="BooksCatalog" component={BooksCatalog} 
              options={{title: 'Catalogo de Libros'}} 
            />
            <Stack.Screen name="BookDetail" component={BookDetail} 
              options={{title: 'Detalle del Libro'}} 
            />
            <Stack.Screen name="PrestarLibro" component={PrestarLibro} 
              options={{title: 'Prestamo de Libro'}} 
            />
             <Stack.Screen name="BorrowedBook" component={BorrowedBook} 
              options={{title: 'Libros Prestados'}} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PrestamoState>
    </FirebaseState>  
  );
}

export default App;