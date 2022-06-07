import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';
import SwitchSelector from 'react-native-switch-selector';

const options = [
  {label: 'Date', value: 0},
  {label: 'Lift', value: 1},
];

export default function History() {
  return (
    <SafeAreaView>
      <Text style={styles.title}>History</Text>
      <SwitchSelector
        options={options}
        initial={0}
        onPress={() => console.log('temp')}
        buttonColor={'gray'}
        buttonMargin={10}
        borderColor={'purple'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});
