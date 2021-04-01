import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';

const LoginStackNav = createStackNavigator();

const LoginStack = () => {
  return (
    <LoginStackNav.Navigator>
      <LoginStackNav.Screen name="Login" component={Login} />
      <LoginStackNav.Screen name="Register" component={Register} />
    </LoginStackNav.Navigator>
  );
};

export default LoginStack;
