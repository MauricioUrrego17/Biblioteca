// LogoutButton.js
import React from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

const LogoutButton = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Sesión cerrada');
                navigation.navigate('Login');
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
