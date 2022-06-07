import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity>
        <Text>Start todays workout</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Make a New Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
