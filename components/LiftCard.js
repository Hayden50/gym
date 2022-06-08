import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const LiftCard = props => {
  return (
    <View style={styles.cardBox}>
      <Text style={styles.propNameStyle}>{props.name}</Text>
      <View>
        <Text style={{...styles.numSetStyle, color: props.numSetColor}}>
          {props.numSet} {props.numSet === '1' ? 'set' : 'sets'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    width: '90%',
    height: 60,
  },
  propNameStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  numSetStyle: {
    fontSize: 15,
    fontStyle: 'italic',
  },
});

export default LiftCard;
