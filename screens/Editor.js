import React, {useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import LiftCard from '../components/LiftCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DayButton from '../components/DayButton';

const possibleNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let origButtonStatusArray = [false, false, false, false, false, false, false];

export default function Editor() {
  const [lift, setLift] = useState('');
  const [nums, setNums] = useState(-1);
  const [liftArray, setLiftArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [liftCount, setLiftCount] = useState(0);
  const [workoutName, setWorkoutName] = useState('');
  const [buttonStatusArr, setButtonStatusArr] = useState(origButtonStatusArray);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const handleAddLift = () => {
    if (lift !== null && lift !== '' && nums !== null && nums !== -1) {
      let i = 0;
      while (i < 9) {
        if (nums === possibleNums[i]) {
          Keyboard.dismiss();
          const newLift = {
            name: lift,
            setNum: nums,
          };
          setLiftArray([...liftArray, newLift]);
          setLift(null);
          setNums(-1);
          setLiftCount(liftCount + 1);
          return;
        }
        i++;
      }
      Alert.alert('Error', 'Your number of sets must be a value 1-9', [
        {
          text: 'Close',
          style: 'cancel',
        },
      ]);
    }
  };

  const handleRemoveLift = index => {
    let liftArrayCopy = [...liftArray];
    liftArrayCopy.splice(index, 1);
    setLiftArray(liftArrayCopy);
    setLiftCount(liftCount - 1);
  };

  const handleBackClick = () => {
    if (modalVisible) {
      setModalVisible(!modalVisible);
    } else {
      Alert.alert('Error', 'Have not implemented functionality yet', [
        {
          text: 'Close',
          style: 'cancel',
        },
      ]);
    }
  };

  const handleNextClick = () => {
    if (liftCount === 0) {
      Alert.alert(
        'Error',
        'You must have at least one lift to create a workout',
        [
          {
            text: 'Close',
            style: 'cancel',
          },
        ],
      );
    } else if (workoutName === '' || workoutName === 'Name Your Workout') {
      Alert.alert('Error', 'You must title your workout', [
        {
          text: 'Close',
          style: 'cancel',
        },
      ]);
    } else {
      setModalVisible(true);
    }
  };

  const handleDayButtonClick = index => {
    let tempArray = buttonStatusArr;
    tempArray[index] = !tempArray[index];
    setButtonStatusArr(tempArray);
    forceUpdate();
  };

  return (
    <>
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.modalStyle}>
          <View style={styles.submitCard}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>
                Choose the Days of this Workout
              </Text>
              <DayButton
                day="Monday"
                buttonStatus={buttonStatusArr[0]}
                onPress={() => handleDayButtonClick(0)}
              />
              <DayButton
                day="Tuesday"
                buttonStatus={buttonStatusArr[1]}
                onPress={() => handleDayButtonClick(1)}
              />
              <DayButton
                day="Wednesday"
                buttonStatus={buttonStatusArr[2]}
                onPress={() => handleDayButtonClick(2)}
              />
              <DayButton
                day="Thursday"
                buttonStatus={buttonStatusArr[3]}
                onPress={() => handleDayButtonClick(3)}
              />
              <DayButton
                day="Friday"
                buttonStatus={buttonStatusArr[4]}
                onPress={() => handleDayButtonClick(4)}
              />
              <DayButton
                day="Saturday"
                buttonStatus={buttonStatusArr[5]}
                onPress={() => handleDayButtonClick(5)}
              />
              <DayButton
                day="Sunday"
                buttonStatus={buttonStatusArr[6]}
                onPress={() => handleDayButtonClick(6)}
              />
            </View>
          </View>
          <View style={styles.bottomModalButtons}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => handleBackClick()}>
              <Text>{modalVisible === false ? 'Cancel' : 'Back'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleNextClick()}>
              <Text>{modalVisible === false ? 'Next' : 'Submit'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TextInput
          placeholder="Name Your Workout"
          onChange={newText => setWorkoutName(newText)}
          style={styles.title}
          value={workoutName}
          maxLength={19}
        />

        {liftArray.map((currLift, index) => {
          return (
            <View key={index} style={styles.fullCard}>
              <LiftCard name={currLift.name} numSet={currLift.setNum} />
              <TouchableOpacity
                onPress={() => handleRemoveLift(index)}
                style={styles.removeButton}>
                <Ionicons name="trash-outline" size={20} />
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
          <Ionicons name="add-outline" size={35} />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => handleBackClick()}>
          <Text>{modalVisible === false ? 'Cancel' : 'Back'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleNextClick()}>
          <Text>{modalVisible === false ? 'Next' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    margin: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#0000000',
    borderRadius: 20,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 150,
    marginVertical: 10,
    borderRadius: 20,
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    marginVertical: 10,
  },
  fullCard: {
    margin: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    borderRadius: 20,
  },
  removeButton: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  returnButton: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    width: '45%',
    borderRadius: 20,
  },
  submitButton: {
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 1,
    width: '45%',
    borderRadius: 20,
  },
  submitCard: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    top: 60,
    bottom: 30,
    right: 50,
    left: 50,
  },
  modalView: {
    position: 'absolute',
    margin: 30,
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    paddingRight: 32,
    paddingLeft: 32,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 40,
  },
  bottomModalButtons: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
});
