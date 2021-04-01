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
import Register from './src/pages/Register';
// import Login from './src/pages/Login';
import {QueryClient, QueryClientProvider} from 'react-query';
import LoginStack from './src/pages/LoginStack';
// import {getUser} from './src/utils/API';

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // console.log(queryClient);

  // const handleInputChange = e => {
  //   setPayload({...payload, title: e.target.value});
  // };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="All Recipes">
          {/* <RecipeEntry /> */}
          <Tab.Screen name="All Recipes" component={Home} />
          <Tab.Screen name="Enter Recipe" component={RecipeEntry} />
          <Tab.Screen name="Login" component={LoginStack} />
          {/* <Tab.Screen style={st} name="Register" component={Register} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   input: {
//     backgroundColor: 'aqua',
//     height: 50,
//     width: 200,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
