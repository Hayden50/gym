import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

export default function WeekCalendar() {
  return (
    <View style={styles.fullBody}>
      <CurrentDay />
      <OffDay />
      <OffDay />
      <OffDay />
      <OffDay />
      <OffDay />
      <OffDay />
      <Text style={styles.text}>WeekCalendar</Text>
    </View>
  );
}

const CurrentDay = () => {
  return (
    <View style={styles.currentDay}>
      <Text style={styles.currentDayTitle}>Current Day - WORKOUT NAME</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <LiftTile />
        <LiftTile />
        <LiftTile />
        <LiftTile />
      </ScrollView>
    </View>
  );
};

const OffDay = () => {
  return (
    <View style={styles.offDay}>
      <Text>OFF DAY TITLE</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Text>HI1 - </Text>
        <Text>HI2 - </Text>
        <Text>HI3</Text>
      </ScrollView>
    </View>
  );
};

const LiftTile = () => {
  return (
    <View style={styles.liftTile}>
      <Text>TEMP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  fullBody: {
    backgroundColor: 'white',
    height: '90%',
  },
  currentDay: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  leftSideScroll: {},
  liftTile: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 12.5,
    borderRadius: 10,
    height: 100,
    width: 140,
  },
  currentDayTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  offDay: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
});
