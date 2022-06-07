import React from 'react';
import Home from './screens/Home';
import History from './screens/History';
import Swiper from 'react-native-swiper';
import Editor from './screens/Editor';

export default function App() {
  return (
    <Editor />
    // <Swiper index={1} loop={false}>
    //   <Home />
    //   <History />
    // </Swiper>
  );
}
