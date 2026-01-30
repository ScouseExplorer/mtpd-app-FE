import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
      <Link href="/(tabs)" style={styles.link}>
         Go to Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
  },
});