import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import WeekCalendar from '../components/WeekCalendar';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.fullView}>
      <Text style={styles.title}>Weekly Outlook</Text>
      <WeekCalendar />
      <BottomButtons onPress={() => navigation.navigate('Editor')} />
    </SafeAreaView>
  );
}

const BottomButtons = props => {
  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity style={styles.button}>
        <Text>Your Created Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text>Create a New Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    width: 170,
    backgroundColor: '#ffffff',
  },
  bottomButtons: {
    flexDirection: 'row',
    margin: 10,
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
