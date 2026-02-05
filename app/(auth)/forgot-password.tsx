import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, } from 'react-native';
import { Link } from 'expo-router';

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    
    const handleForgotPassword = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }
        Alert.alert('Success', `Password reset link sent to ${email}`);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        
        
        <TouchableOpacity style={styles.resetBox} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        <Link href="/" asChild>
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back to Login</Text>
            </TouchableOpacity>
        </Link>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        
    },
    resetBox: {
        backgroundColor: '#007AFF', // Blue color for reset button
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    backButtonText: {
        color: '#007AFF',
        fontSize: 16,
    },
});
