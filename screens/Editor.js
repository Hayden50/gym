import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import LiftCard from '../components/LiftCard';

export default function Editor() {
  const [lift, setLift] = useState('');
  const [nums, setNums] = useState(-1);
  const [liftArray, setLiftArray] = useState([]);

  const handleAddLift = () => {
    if (lift !== null && lift !== '' && nums !== null && nums !== -1) {
      Keyboard.dismiss();
      const newLift = {
        name: lift,
        setNum: nums,
      };
      setLiftArray([...liftArray, newLift]);
      setLift(null);
      setNums(-1);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Create Your Workout</Text>
      {liftArray.map((currLift, index) => {
        return (
          <LiftCard key={index} name={currLift.name} numSet={currLift.setNum} />
        );
      })}
      <View style={styles.cardBox}>
        <TextInput
          placeholder="Workout Name"
          onChangeText={newText => setLift(newText)}
          value={lift}
        />
        <View>
          <TextInput
            placeholder="Number of Sets"
            keyboardType="number-pad"
            onChangeText={newText => setNums(newText)}
            value={nums}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleAddLift()}
        style={styles.addLiftButton}>
        <Text>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    margin: 10,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#0000000',
  },
  propNameStyle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  numSetStyle: {
    fontSize: 15,
    color: '#FF0000',
  },
  addLiftButton: {
    marginLeft: 15,
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});
