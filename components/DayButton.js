/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const DayButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        borderColor: props.currColor,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor:
          props.buttonStatus === false ? '#333333' : props.currColor,
        height: 55,
        width: 250,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 22,
          paddingHorizontal: 45,
          paddingVertical: 12,
          color: props.buttonStatus === false ? props.currColor : 'black',
        }}>
        {props.day}
      </Text>
    </TouchableOpacity>
  );
};

export default DayButton;
