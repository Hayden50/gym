import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Home({navigation}) {
  return (
    <SafeAreaView>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Home</Text>
      <TouchableOpacity>
        <Text>Start todays workout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Editor')}>
        <Text>Make a New Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
