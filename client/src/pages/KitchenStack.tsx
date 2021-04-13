import React, {useContext, useEffect, useState} from 'react';
// import {ScrollView, View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
import Logout from './Logout';
import Profile from './Profile';
// import SearchUsers from './SearchUsers';
import CreateKitchen from './CreateKitchen';
import ManageKitchens from './ManageKitchens';
import KitchensContext from '../utils/KitchensContext';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import GroceryList from './GroceryList';

const KitcStack = createStackNavigator();

const KitchenStack = () => {
  const [myKitchens, setMyKitchens] = useState([]);
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log('ran');
    // if (myKitchens.length == 0) {
    axios
      .get(`http://192.168.56.1:3001/api/user/${user.user.id}`)
      .then(res => setMyKitchens(res.data.kitchens))
      .catch(err => console.log(err));
    // }
    return () => {};
  }, []);
  return (
    // <NavigationContainer>
    <KitchensContext.Provider value={{myKitchens, setMyKitchens}}>
      <KitcStack.Navigator initialRouteName="profile">
        <KitcStack.Screen name="Manage Kitchens" component={ManageKitchens} />
        {/* <KitcStack.Screen name="Logout" component={Logout} /> */}
        {/* <KitcStack.Screen name="Search Users" component={SearchUsers} /> */}
        <KitcStack.Screen name="Create a Kitchen" component={CreateKitchen} />
        <KitcStack.Screen name="Grocery List" component={GroceryList} />
        {/* <KitcStack.Screen name="Search Users" component={SearchUsers} /> */}
        {/* <KitcStack.Screen name="Manage Kitchens" component={ManageKitchens} /> */}
      </KitcStack.Navigator>
    </KitchensContext.Provider>

    // </NavigationContainer>
  );
};

export default KitchenStack;
