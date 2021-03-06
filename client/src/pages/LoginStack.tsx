import React from 'react';
import {NavigationContainer, Button} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Register from './Register';

const LoginStackNav = createStackNavigator();

const LoginStack = () => {
  React.useEffect(() => {
    return () => {};
  }, []);
  return (
    <LoginStackNav.Navigator>
      <LoginStackNav.Screen name="Login" component={Login} />
      <LoginStackNav.Screen name="Register" component={Register} />
      {/* <Button onPress={() => {}} title="Logout" /> */}
    </LoginStackNav.Navigator>
  );
};

export default LoginStack;
