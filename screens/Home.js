import {SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.fullView}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.button}>
        <Text>Start todays workout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Editor')}
        style={styles.button}>
        <Text>Create a New Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },
  fullView: {
    backgroundColor: '#191919',
    flex: 1,
  },
});
