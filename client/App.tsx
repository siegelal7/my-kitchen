/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
// import Section from './src/components/Section';
// import axios from 'axios';
import RecipeEntry from './src/components/RecipeEntry';
// import Input from './src/components/Input';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';

const Tab = createBottomTabNavigator();

const App: () => Node = () => {
  const [payload, setPayload] = useState({
    title: '',
    instructions: ['for now', "i'll hardcode it", 'wah'],
  });
  const isDarkMode = useColorScheme() === 'dark';

  // const handleInputChange = e => {
  //   setPayload({...payload, title: e.target.value});
  // };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        {/* <RecipeEntry /> */}
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Enter Recipe" component={RecipeEntry} />
      </Tab.Navigator>
    </NavigationContainer>

    // <Input
    //   placeHolder="weeee"
    //   label="test"
    //   onChangeText={handleInputChange}
    //   value={payload.title}
    // />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'aqua',
    height: 50,
    width: 200,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
