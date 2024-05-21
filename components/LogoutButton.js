// LogoutButton.js
import React from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { Alert } from 'react-native';

const LogoutButton = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Sesión cerrada');
                Alert.alert('Sesion Cerrada', 'La sesion se ha cerrado de manera exitosa!',
                    [
                        {
                            text: 'Ok',
                            onPress:() => {
                                navigation.navigate('Login');
                            }
                        }
                    ]
                )
            })
            .catch(error => {
                console.error('Error al cerrar sesión', error);
            });
    };

    return (
        <Button
            onPress={handleLogout}
            mode="text"
            textColor="#411f2d"
        >
            Cerrar Sesión
        </Button>
    );
};

export default LogoutButton;
