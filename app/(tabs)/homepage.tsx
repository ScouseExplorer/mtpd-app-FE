import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

const HomePage = () => {
  const router = useRouter();

  const handlePress = (boxNumber: number) => {
    Alert.alert(`Box ${boxNumber} Pressed!`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.rowContainer}>
            <Pressable style={[styles.box, styles.firstBox]} onPress={() => router.push('/quiz')}>
              <Text style={styles.boxText}>Theory Questions</Text>
            </Pressable>
            <Pressable style={[styles.box, styles.secondBox]} onPress={() => handlePress(2)}>
              <Text style={styles.boxText}>Road Signs</Text>
            </Pressable>
          </View>

          <View style={styles.rowContainer}>
            <Pressable style={[styles.box, styles.thirdBox]} onPress={() => handlePress(3)}>
              <Text style={styles.boxText}>Driving Videos</Text>
            </Pressable>
            <Pressable style={[styles.box, styles.fifthBox]} onPress={() => handlePress(5)}>
              <Text style={styles.boxText}>Highway Code</Text>
            </Pressable>
          </View>

          <View style={styles.rowContainer}>
            <Pressable style={[styles.box, styles.sixthBox]} onPress={() => handlePress(6)}>
              <Text style={styles.boxText}>My Thoughts</Text>
            </Pressable>

            <Pressable style={[styles.box, styles.sixthBox]} onPress={() => router.push('/bookmarks')}>
              <Text style={styles.boxText}>Bookmarks</Text>
            </Pressable>
            
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 150,
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  box: {
    width: 170,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  firstBox: {
    backgroundColor: '#007AFF',
  },
  secondBox: {
    backgroundColor: '#34C759',
  },
  thirdBox: {
    backgroundColor: '#FF9500',
  },
  fourthBox: {
    backgroundColor: '#FF2D55',
  },
  fifthBox: {
    backgroundColor: '#5856D6',
  },
  sixthBox: {
    backgroundColor: '#FF2D55',
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});