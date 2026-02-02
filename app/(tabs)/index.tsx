import React from 'react';
import { Image, StyleSheet, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  };

  const handleGoogleLogin = () => {
    console.log('Logging in with Google');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.formContainer}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/metds-logo-png.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#FF5733' : '#007AFF' },
          ]}
          onPress={handleLogin}
        >
          <ThemedText style={styles.buttonText}>Sign In</ThemedText>
        </Pressable>

        {/* Google Login Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#FF5733' : '#DB4437' }, // Google red color
          ]}
          onPress={handleGoogleLogin}
        >
          <ThemedText style={styles.buttonText}>Sign In with Google</ThemedText>
        </Pressable>

        {/* Additional Links */}
        <View style={styles.linksContainer}>
          <Link href="/(auth)/forgot-password" style={styles.linkText}>
            Forgot Password?
          </Link>
          <Link href="/(auth)/create-account" style={styles.linkText}>
            Create Account
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: 250,
    alignSelf: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: 190,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'lightgrey',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  logo: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
});