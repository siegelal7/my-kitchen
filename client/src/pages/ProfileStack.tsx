import React, {useContext, useEffect, useState} from 'react';
// import {ScrollView, View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
import Logout from './Logout';
import Profile from './Profile';
import SearchUsers from './SearchUsers';
import CreateKitchen from './CreateKitchen';
import ManageKitchens from './ManageKitchens';
import KitchensContext from '../utils/KitchensContext';
import UserContext from '../utils/UserContext';
import axios from 'axios';

const ProfStack = createStackNavigator();

const ProfileStack = () => {
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
      <ProfStack.Navigator initialRouteName="profile">
        <ProfStack.Screen name="profile" component={Profile} />
        <ProfStack.Screen name="Logout" component={Logout} />
        <ProfStack.Screen name="Search Users" component={SearchUsers} />
        <ProfStack.Screen name="Create a Kitchen" component={CreateKitchen} />
        <ProfStack.Screen name="Manage Kitchens" component={ManageKitchens} />
      </ProfStack.Navigator>
    </KitchensContext.Provider>

    // </NavigationContainer>
  );
};

export default ProfileStack;
