import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import theme from '../styles/theme.style';
import {logout, auth, handleCreateAccount} from '../firebase';
import {onAuthStateChanged} from 'firebase/auth';

const Login = ({navigation}) => {
  const [status, setStatus] = useState('Logged Out');

  onAuthStateChanged(auth, user => {
    if (user) {
      setStatus(user.email);
    } else {
      setStatus('Logged Out');
    }
  });

  const handleSubmit = (username, pass) => {
    handleCreateAccount(username, pass);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>TITLE</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, _, values}) => (
          <View>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              placeholderTextColor={theme.COLORS.light_light_gray}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              placeholderTextColor={theme.COLORS.light_light_gray}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize={'none'}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleSubmit(values.email, values.password)}
              title="Submit">
              <Text style={styles.submitButtonText}>
                Login / Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.forgotBody}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => logout()}>
        <Text style={{color: 'white'}}>LOGOUT</Text>
      </TouchableOpacity>
      <Text>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    height: 50,
    borderColor: theme.COLORS.light_gray,
    color: theme.COLORS.light_light_gray,
  },
  body: {
    backgroundColor: theme.COLORS.dark_gray,
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    color: theme.COLORS.white,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.blue,
    margin: 10,
    height: 50,
  },
  submitButtonText: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 20,
  },
  forgotBody: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: theme.COLORS.blue,
    fontStyle: 'italic',
  },
});

export default Login;
