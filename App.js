import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Home from './screens/Home';
import History from './screens/History';
import Swiper from 'react-native-swiper';
import Editor from './screens/Editor';

export default function App() {
  return (
    <Swiper index={1} loop={false}>
      <Editor />
      <Home />
      <History />
    </Swiper>
  );
}
