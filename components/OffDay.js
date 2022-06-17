import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import theme from '../styles/theme.style';

const OffDay = () => {
  return (
    <View style={styles.offDay}>
      <Text style={styles.offDayTitle}>OFF DAY TITLE</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Text>HI1 - </Text>
        <Text>HI2 - </Text>
        <Text>HI3</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  offDay: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    height: 75,
    backgroundColor: theme.COLORS.light_gray,
  },
  offDayTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OffDay;
