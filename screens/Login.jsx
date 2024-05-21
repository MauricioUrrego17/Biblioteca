import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigation();

    const handleSignIn = () => {
        if (!email || !password) {
            setError("Por favor ingresa email y contraseña");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Inicio de Sesion Exitoso');
                setError("");
                setEmail("");
                setPassword("");
                navigation.navigate('BooksCatalog');
            })
            .catch(error => {
                console.error(error);
                setError("Fallo el inicio de sesion. Por favor revisa tu email y contraseña");
            });
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                value={email}
                onChangeText={email => setEmail(email)}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                outlineColor="#411f2d"
                activeOutlineColor="#ffe29a"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={password => setPassword(password)}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                mode="outlined"
                outlineColor="#411f2d"
                activeOutlineColor="#ffe29a"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={handleSignIn}   
                    style={styles.button}
                >
                    Iniciar Sesion
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
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
        marginTop: 10,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    error: {
        color: 'red',
        marginBottom: 16,
        textAlign: "center"
    }
});

export default Login;
