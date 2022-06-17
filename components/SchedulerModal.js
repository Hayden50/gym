import {
  View,
  Text,
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../styles/theme.style';
import ModalDropdown from 'react-native-modal-dropdown';

const SchedulerModal = props => {
  const dropdownOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [rotation, setRotation] = useState(1);

  return (
    <SafeAreaView>
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={props.modalVisible}>
        <View style={styles.modalBody}>
          <ModalDropdown
            options={dropdownOptions}
            dropdownStyle={{color: theme.COLORS.green}}
            onSelect={(_, value) => setRotation(value + 1)}
            defaultValue={'Days in Rotation: '}
            style={styles.dropdownButton}
            textStyle={styles.dropdownText}
            isFullWidth={true}
          />
          <RotationList rotation={rotation} />
          <CancelButton closeModal={props.closeModal} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const RotationList = props => {
  const arr = [];
  for (let i = 1; i < props.rotation; i++) {
    arr.push(i);
  }
  return (
    <ScrollView>
      <View style={styles.rotationListBody}>
        {arr.map((value, index) => {
          return (
            <View style={styles.listCard} key={index}>
              <Text style={styles.listCardText}>Lift Number {value}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const CancelButton = props => {
  return (
    <TouchableOpacity onPress={props.closeModal} style={styles.cancelButton}>
      <Text style={styles.closeButton}>Cancel</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    flex: 1,
    backgroundColor: theme.COLORS.light_gray,
    padding: 10,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  cancelButton: {
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    backgroundColor: theme.COLORS.light_light_gray,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButton: {
    color: theme.COLORS.dark_gray,
    paddingTop: 10,
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  listCard: {
    backgroundColor: theme.COLORS.dark_gray,
    height: 75,
    marginVertical: 10,
    borderRadius: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.COLORS.light_light_gray,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 40,
    borderRadius: 10,
  },
  dropdownText: {
    color: theme.COLORS.black,
    fontSize: 15,
  },
  listCardText: {
    padding: 10,
    color: theme.COLORS.light_light_gray,
  },
});

export default SchedulerModal;
