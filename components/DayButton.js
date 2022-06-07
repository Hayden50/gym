/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const DayButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 20,
        marginBottom: 20,
        backgroundColor: props.buttonStatus === false ? 'white' : 'blue',
        height: 55,
        width: 250,
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 22,
          paddingHorizontal: 45,
          paddingVertical: 12,
          color: props.buttonStatus === false ? 'black' : 'white',
        }}>
        {props.day}
      </Text>
    </TouchableOpacity>
  );
};

export default DayButton;
