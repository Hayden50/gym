import React from 'react';
import Editor from './screens/Editor';
import Home from './screens/Home';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Editor" component={Editor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
