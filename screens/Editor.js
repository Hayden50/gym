/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import LiftCard from '../components/LiftCard';
// import Ionicons from '../node_modules/react-native-vector-icons/Ionicons';
import DayButton from '../components/DayButton';
import EditorTitle from '../components/EditorTitle';
import theme from '../styles/theme.style';
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import db from '../firebase';

const colors = theme.COLORS;
const colorArr = [
  colors.blue,
  colors.yellow,
  colors.red,
  colors.purple,
  colors.green,
  colors.orange,
  colors.pink,
];

const possibleNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let origButtonStatusArray = [false, false, false, false, false, false, false];
let origWorkoutName = '';

export default function Editor({navigation}) {
  const [lift, setLift] = useState('');
  const [nums, setNums] = useState(-1);
  const [liftArray, setLiftArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [liftCount, setLiftCount] = useState(0);
  const [workoutName, setWorkoutName] = useState(origWorkoutName);
  const [buttonStatusArr, setButtonStatusArr] = useState(origButtonStatusArray);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState(0);

  const handleAddLift = () => {
    if (lift !== null && lift !== '' && nums !== null && nums !== -1) {
      console.log(workoutName);
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

  const handleModalColorClick = index => {
    setColorModalVisible(false);
    setCurrentColor(index);
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
      navigation.navigate('Home');
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

  const submitToFireBase = async () => {
    for (const day of buttonStatusArr) {
      if (day === true) {
        try {
          const workoutCol = doc(db, 'workouts', workoutName);
          await setDoc(workoutCol, {
            name: workoutName,
            color: colorArr[currentColor],
            daysOfRotation: buttonStatusArr,
            lifts: liftArray,
            createdAt: Timestamp.now(),
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
        navigation.navigate('Home');
        return;
      }
    }
    Alert.alert('Error', 'You must select at least one day of the week', [
      {
        text: 'Close',
        style: 'cancel',
      },
    ]);
  };

  const handleDayButtonClick = index => {
    let tempArray = buttonStatusArr;
    tempArray[index] = !tempArray[index];
    setButtonStatusArr(tempArray);
    forceUpdate();
  };

  return (
    <View style={styles.fullView}>
      <View>
        <ScrollView style={styles.scrollView}>
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
                  currColor={colorArr[currentColor]}
                />
                <DayButton
                  day="Tuesday"
                  buttonStatus={buttonStatusArr[1]}
                  onPress={() => handleDayButtonClick(1)}
                  currColor={colorArr[currentColor]}
                />
                <DayButton
                  day="Wednesday"
                  buttonStatus={buttonStatusArr[2]}
                  onPress={() => handleDayButtonClick(2)}
                  currColor={colorArr[currentColor]}
                />
                <DayButton
                  day="Thursday"
                  buttonStatus={buttonStatusArr[3]}
                  onPress={() => handleDayButtonClick(3)}
                  currColor={colorArr[currentColor]}
                />
                <DayButton
                  day="Friday"
                  buttonStatus={buttonStatusArr[4]}
                  onPress={() => handleDayButtonClick(4)}
                  currColor={colorArr[currentColor]}
                />
                <DayButton
                  day="Saturday"
                  buttonStatus={buttonStatusArr[5]}
                  onPress={() => handleDayButtonClick(5)}
                  currColor={colorArr[currentColor]}
                />
                <DayButton
                  day="Sunday"
                  buttonStatus={buttonStatusArr[6]}
                  onPress={() => handleDayButtonClick(6)}
                  currColor={colorArr[currentColor]}
                />
              </View>
            </View>
            <View style={styles.bottomModalButtons}>
              <TouchableOpacity
                style={styles.returnModalButton}
                onPress={() => handleBackClick()}>
                <Text> </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitModalButton}
                onPress={() => submitToFireBase()}>
                <Text> </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <EditorTitle
            onChange={newText => setWorkoutName(newText)}
            colorArr={colorArr}
            currentColor={currentColor}
            colorModalVisible={colorModalVisible}
            changeVisibility={() => setColorModalVisible(!colorModalVisible)}
            handleModalColorClick={index => handleModalColorClick(index)}
          />

          {liftArray.map((currLift, index) => {
            return (
              <View key={index} style={styles.fullCard}>
                <LiftCard
                  name={currLift.name}
                  numSet={currLift.setNum}
                  numSetColor={colorArr[currentColor]}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveLift(index)}
                  style={styles.removeButton}>
                  {/* <Ionicons name="trash-outline" size={20} /> */}
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.cardBox}>
            <TextInput
              placeholder="Lift Name"
              placeholderTextColor={colors.light_light_gray}
              onChangeText={newText => setLift(newText)}
              value={lift}
              style={styles.placeholderWorkoutInput}
            />
            <View>
              <TextInput
                type={'number'}
                placeholder="Number of Sets"
                placeholderTextColor={colors.light_light_gray}
                keyboardType="number-pad"
                onChangeText={newText => setNums(newText)}
                maxLength={1}
                value={nums}
                style={{color: colorArr[currentColor]}}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleAddLift()}
            style={styles.addLiftButton}>
            {/* <Ionicons name="add-outline" size={35} /> */}
            <Text>+</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => handleBackClick()}>
          <Text style={styles.bottomCardText}>
            {modalVisible === false ? 'Cancel' : 'Back'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.submitButton,
            backgroundColor:
              modalVisible && buttonStatusArr !== [0, 0, 0, 0, 0, 0, 0]
                ? colorArr[currentColor]
                : colors.light_gray,
          }}
          onPress={() => handleNextClick()}>
          <Text style={styles.bottomCardText}>
            {modalVisible === false ? 'Next' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    backgroundColor: colors.light_gray,
    height: 80,
  },
  scrollView: {
    height: '87.5%',
    paddingTop: 37.5,
  },
  fullView: {
    backgroundColor: colors.dark_gray,
    flex: 1,
  },
  addLiftButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  fullCard: {
    margin: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.black,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: colors.light_gray,
  },
  removeButton: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  placeholderWorkoutInput: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  returnButton: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    width: '45%',
    borderRadius: 10,
    backgroundColor: colors.light_gray,
  },
  submitButton: {
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderWidth: 1,
    width: '45%',
    borderRadius: 10,
    backgroundColor: colors.light_gray,
  },
  returnModalButton: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'center',
    width: '45%',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  },
  submitModalButton: {
    margin: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: '45%',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
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
    backgroundColor: colors.light_gray,
    borderRadius: 10,
    paddingRight: 32,
    paddingLeft: 32,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    shadowColor: colors.black,
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
    color: colors.white,
  },
  bottomModalButtons: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  bottomCardText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
