import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        // if (!validateEmail(email)) {
        //     Alert.alert("Error", "Please enter a valid email address.");
        //     return;
        // }
        router.push('/searchtrain')
    };
    return (
        <ImageBackground
            source={{ uri:
                 'data:image/jpeg;base64,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' }} // Background image URL
            style={styles.background}           
        >
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back!</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#aaaaaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#5061FC', // You can change this color to fit your design
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginPage;
