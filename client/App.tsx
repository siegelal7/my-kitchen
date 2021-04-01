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

  return (
    <UserContext.Provider value={{user, setUser}}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="All Recipes">
            <Tab.Screen name="All Recipes" component={Home} />
            <Tab.Screen name="Enter Recipe" component={RecipeEntry} />
            {/* another stack in LoginStack.tsx */}
            <Tab.Screen name="Login" component={LoginStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default App;
