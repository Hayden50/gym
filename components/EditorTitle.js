import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Modal,
} from 'react-native';
import React from 'react';
import theme from '../styles/theme.style';

const EditorTitle = props => {
  return (
    <>
      <View style={styles.topBar}>
        <TextInput
          placeholder="Name Your Workout"
          placeholderTextColor={theme.COLORS.light_gray}
          onChangeText={props.onChange}
          style={{...styles.title, color: props.colorArr[props.currentColor]}}
          maxLength={19}
        />
        <TouchableOpacity onPress={props.changeVisibility}>
          <Text
            style={{
              ...styles.editColorButton,
              backgroundColor: props.colorArr[props.currentColor],
            }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={props.colorModalVisible}
        style={styles.modalStyle}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            {props.colorArr.map((color, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={function handleModalColorClick() {
                    props.handleModalColorClick(index);
                  }}>
                  <View
                    style={{
                      ...styles.modalColorButton,
                      backgroundColor: color,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    margin: 30,
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
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
  editColorButton: {
    borderWidth: 1,
    borderRadius: 4,
    height: 16,
    width: 16,
    overflow: 'hidden',
  },
  modalColorButton: {
    height: 50,
    width: 50,
    borderRadius: 8,
    margin: 8,
  },
});

export default EditorTitle;
