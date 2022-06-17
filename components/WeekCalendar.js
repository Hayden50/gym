import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import db from '../firebase';
import {doc, getDoc} from 'firebase/firestore';
import theme from '../styles/theme.style';
import OffDay from './OffDay';

export default function WeekCalendar() {
  const [liftObj, setLiftObj] = useState({});
  const [lifts, setLifts] = useState([]);

  useEffect(() => {
    async function getCurrentObject(id) {
      const docRef = doc(db, 'workouts', id);
      const object = await getDoc(docRef);
      setLiftObj(object.data());
      setLifts(object.data().lifts);
    }
    getCurrentObject('Test Workout');
  }, []);

  return (
    <View style={styles.fullBody}>
      <CurrentDay title={liftObj.name} lifts={lifts} color={liftObj.color} />
      <OffDay />
      <OffDay />
      <OffDay />
      <OffDay />
      <OffDay />
    </View>
  );
}

const CurrentDay = props => {
  return (
    <View style={{...styles.currentDay}}>
      <Text style={styles.currentDayTitle}>{props.title}</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.lifts.map((lift, index) => {
          return <LiftTile name={lift.name} key={index} color={props.color} />;
        })}
      </ScrollView>
    </View>
  );
};

const LiftTile = props => {
  return (
    <View style={{...styles.liftTile, backgroundColor: props.color}}>
      <Text style={styles.liftTileTitle}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  fullBody: {
    backgroundColor: theme.COLORS.dark_gray,
    height: '90%',
  },
  currentDay: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: theme.COLORS.blue,
    backgroundColor: theme.COLORS.light_gray,
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
    color: 'white',
  },
  liftTileTitle: {
    padding: 5,
    fontWeight: 'bold',
  },
});
