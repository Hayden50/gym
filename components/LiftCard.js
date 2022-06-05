import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LiftCard = props => {
  return (
    <View style={styles.cardBox}>
      <Text style={styles.propNameStyle}>{props.name}</Text>
      <View>
        <Text style={styles.numSetStyle}>{props.numSet}</Text>
      </View>
    </View>
  );
};

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
});

export default LiftCard;
