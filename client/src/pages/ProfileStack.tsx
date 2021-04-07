import React from 'react';
import {ScrollView, View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Logout from './Logout';
import Profile from './Profile';

const ProfStack = createStackNavigator();

const ProfileStack = () => {
  return (
    // <NavigationContainer>
    <ProfStack.Navigator initialRouteName="profile">
      <ProfStack.Screen name="profile" component={Profile} />
      <ProfStack.Screen name="Logout" component={Logout} />
    </ProfStack.Navigator>
    // </NavigationContainer>
  );
};

export default ProfileStack;
