/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import type {Node} from 'react';
// import {useColorScheme} from 'react-native';
// import RecipeEntry from './src/components/RecipeEntry';
// import Input from './src/components/Input';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Recipes from './src/pages/Recipes';
import {QueryClient, QueryClientProvider} from 'react-query';
import LoginStack from './src/pages/LoginStack';
import UserContext from './src/utils/UserContext';
import KitchensContext from './src/utils/KitchensContext';
// import Logout from './src/pages/Logout';
import ProfileStack from './src/pages/ProfileStack';
import RecipesStack from './src/pages/RecipesStack';
import KitchenStack from './src/pages/KitchenStack';
import KitchensImInContext from './src/utils/KitchensImInContext';

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600,
    },
  },
});

const App: () => Node = () => {
  const [user, setUser] = useState({});
  const [myKitchens, setMyKitchens] = useState([]);
  const [kitchensImIn, setKitchensImIn] = useState([]);

  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <KitchensContext.Provider value={{myKitchens, setMyKitchens}}>
      <KitchensImInContext.Provider value={{kitchensImIn, setKitchensImIn}}>
        <UserContext.Provider value={{user, setUser}}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <Tab.Navigator initialRouteName="All Recipes">
                <Tab.Screen name="Recipes" component={RecipesStack} />

                {user.token ? (
                  <>
                    <Tab.Screen name="Kitchens" component={KitchenStack} />
                    <Tab.Screen name="Profile" component={ProfileStack} />
                  </>
                ) : (
                  <Tab.Screen name="Login" component={LoginStack} />
                )}
              </Tab.Navigator>
            </NavigationContainer>
          </QueryClientProvider>
        </UserContext.Provider>
      </KitchensImInContext.Provider>
    </KitchensContext.Provider>
  );
};

export default App;
