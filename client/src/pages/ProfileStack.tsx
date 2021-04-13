import React, {useContext, useEffect, useState} from 'react';
// import {ScrollView, View} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
import Logout from './Logout';
import Profile from './Profile';
import SearchUsers from './SearchUsers';
// import CreateKitchen from './CreateKitchen';
// import ManageKitchens from './ManageKitchens';
import KitchensContext from '../utils/KitchensContext';
import KitchensImInContext from '../utils/KitchensImInContext';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import KitchenStack from './KitchenStack';

const ProfStack = createStackNavigator();

const ProfileStack = () => {
  const [myKitchens, setMyKitchens] = useState([]);
  const [kitchensImIn, setKitchensImIn] = useState([]);
  const {user} = useContext(UserContext);
  // useEffect(() => {
  //   console.log('ran');
  //   // if (myKitchens.length == 0) {

  //   axios
  //     .get(`http://192.168.56.1:3001/api/user/${user.id}`)
  //     .then(res => {
  //       // console.log(res.data.kitchens[0].groceryList);
  //       const mine = res.data.kitchens.filter(i => i.owner === user.id);
  //       const imIn = res.data.kitchens.filter(i => i.owner !== user.id);
  //       // setKitchensImIn(imIn);
  //       setMyKitchens(mine);
  //     })
  //     .catch(err => console.log(err));
  //   // }
  //   return () => {};
  // }, []);
  return (
    // <NavigationContainer>
    // <KitchensImInContext.Provider value={{kitchensImIn, setKitchensImIn}}>
    //   <KitchensContext.Provider value={{myKitchens, setMyKitchens}}>
    <ProfStack.Navigator initialRouteName="profile">
      <ProfStack.Screen name="profile" component={Profile} />
      <ProfStack.Screen name="Logout" component={Logout} />
      {/* <ProfStack.Screen name="Search Users" component={SearchUsers} /> */}
      <ProfStack.Screen name="Kitchen Stack" component={KitchenStack} />
      {/* <ProfStack.Screen name="Search Users" component={SearchUsers} /> */}
      {/* <ProfStack.Screen name="Create a Kitchen" component={CreateKitchen} /> */}
      {/* <ProfStack.Screen name="Manage Kitchens" component={ManageKitchens} /> */}
    </ProfStack.Navigator>
    //   </KitchensContext.Provider>
    // </KitchensImInContext.Provider>
    // </NavigationContainer>
  );
};

export default ProfileStack;
