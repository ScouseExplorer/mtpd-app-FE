import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, } from 'react-native';

export default function CreateAccount() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleSignup = () => {
        if (password !== confirmPassword){
            Alert.alert("Passwords do not match");
            return;
        } else if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Please fill in all fields");
            return;
        }

        // Here you would typically handle the signup logic, e.g., API call
        // please add a button to the login page that redirects to the login page after successful signup
    }
    
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <TextInput
            style={styles.input}
            placeholder = "Name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="words"
            

        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            
        />
        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
        />
        <TouchableOpacity style={styles.signupBox} onPress={handleSignup}>
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
    signupBox: {
        backgroundColor: '#007AFF', // Blue color for signup button
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#FFFFFF', // White text color
        fontSize: 16,
        fontWeight: 'bold',
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
