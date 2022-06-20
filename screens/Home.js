import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import WeekCalendar from '../components/WeekCalendar';
import SchedulerModal from '../components/SchedulerModal';
import {logout, auth} from '../firebase';
import {onAuthStateChanged} from 'firebase/auth';

export default function Home({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});

  onAuthStateChanged(auth, user => {
    if (user) {
      setUserData(user);
    } else {
      navigation.navigate('Login');
    }
  });

  return (
    <SafeAreaView style={styles.fullView}>
      <Header userData={userData} />
      <WeekCalendar />
      <BottomButtons
        toEditor={() => navigation.navigate('Editor')}
        toScheduler={() => setModalVisible(true)}
      />
      <SchedulerModal
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const BottomButtons = props => {
  return (
    <View style={styles.bottomButtons}>
      <TouchableOpacity onPress={props.toScheduler} style={styles.button}>
        <Text>Schedule Your Workouts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.toEditor} style={styles.button}>
        <Text>Create a New Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Your Weekly Outlook</Text>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={{color: 'white'}}>X</Text>
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
    fontStyle: 'italic',
    color: '#ffffff',
  },
  fullView: {
    backgroundColor: '#191919',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});
