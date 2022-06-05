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

const possibleNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function Editor() {
  const [lift, setLift] = useState('');
  const [nums, setNums] = useState(-1);
  const [liftArray, setLiftArray] = useState([]);

  const handleAddLift = () => {
    if (lift !== null && lift !== '' && nums !== null && nums !== -1) {
      let i = 0;
      while (i < 10) {
        if (nums === possibleNums[i]) {
          Keyboard.dismiss();
          const newLift = {
            name: lift,
            setNum: nums,
          };
          setLiftArray([...liftArray, newLift]);
          setLift(null);
          setNums(-1);
          break;
        }
        i++;
      }
    }
  };

  const handleRemoveLift = index => {
    let liftArrayCopy = [...liftArray];
    liftArrayCopy.splice(index, 1);
    setLiftArray(liftArrayCopy);
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Create a New Workout</Text>

      {liftArray.map((currLift, index) => {
        return (
          <View key={index} style={styles.fullCard}>
            <LiftCard name={currLift.name} numSet={currLift.setNum} />
            <TouchableOpacity
              onPress={() => handleRemoveLift(index)}
              style={styles.removeButton}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
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
            type={'number'}
            placeholder="Number of Sets"
            keyboardType="number-pad"
            onChangeText={newText => setNums(newText)}
            value={nums}
            maxLength={1}
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
  fullCard: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  removeButton: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 12,
  },
});
