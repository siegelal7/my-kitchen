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
import {useColorScheme} from 'react-native';

import RecipeEntry from './src/components/RecipeEntry';
// import Input from './src/components/Input';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/pages/Home';
import {QueryClient, QueryClientProvider} from 'react-query';
import LoginStack from './src/pages/LoginStack';
import UserContext from './src/utils/UserContext';

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App: () => Node = () => {
  const [user, setUser] = useState({});
  const isDarkMode = useColorScheme() === 'dark';
  // console.log(queryClient);

  // const handleInputChange = e => {
  //   setPayload({...payload, title: e.target.value});
  // };

  return (
    <UserContext.Provider value={{user, setUser}}>
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
    </UserContext.Provider>
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
