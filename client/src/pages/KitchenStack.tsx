import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
import Logout from './Logout';
import Profile from './Profile';
import SearchUsers from './SearchUsers';
import CreateKitchen from './CreateKitchen';
import ManageKitchens from './ManageKitchens';
import KitchensContext from '../utils/KitchensContext';
import KitchensImInContext from '../utils/KitchensImInContext';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import Kitchen from './Kitchen';
import {useQuery} from 'react-query';

const KitchStack = createStackNavigator();

const KitchenStack = () => {
  const [myKitchens, setMyKitchens] = useState([]);
  const {user} = useContext(UserContext);
  // const {}
  const [kitchensImIn, setKitchensImIn] = useState([]);

  const fetchKitchens = () => {
    return axios.get(`http://192.168.56.1:3001/api/user/${user.id}`);
  };
  const {isLoading, isError, data, error} = useQuery('kitchens', fetchKitchens);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  useEffect(() => {
    if (data && data.data) {
      console.log('ranKitchenStack useEffect');
      const imIn = data.data.kitchens.filter(j => j.owner !== user.id);
      const mine = data.data.kitchens.filter(i => i.owner === user.id);
      setKitchensImIn(imIn);
      setMyKitchens(mine);
      return;
    }
    return () => {};
  }, [data]);

  // useEffect(() => {
  //   fetchKitchens()
  //     .then(res => {
  //       const imIn = res.data.kitchens.filter(j => j.owner !== user.id);
  //       const mine = res.data.kitchens.filter(i => i.owner === user.id);
  //       setKitchensImIn(imIn);
  //       setMyKitchens(mine);
  //     })
  //     .catch(err => console.log(err));
  //   return () => {};
  // }, []);

  return (
    // <NavigationContainer>
    <KitchensImInContext.Provider value={{kitchensImIn, setKitchensImIn}}>
      <KitchensContext.Provider value={{myKitchens, setMyKitchens}}>
        <KitchStack.Navigator initialRouteName="Manage Kitchens">
          <KitchStack.Screen
            name="Manage Kitchens"
            component={ManageKitchens}
          />
          {/* <KitchStack.Screen name="Logout" component={Logout} /> */}
          <KitchStack.Screen name="Search Users" component={SearchUsers} />
          <KitchStack.Screen
            name="Create a Kitchen"
            component={CreateKitchen}
          />
          <KitchStack.Screen name="Grocery List" component={Kitchen} />
          {/* <KitchStack.Screen name="Search Users" component={SearchUsers} /> */}
          {/* <KitchStack.Screen name="Manage Kitchens" component={ManageKitchens} /> */}
        </KitchStack.Navigator>
      </KitchensContext.Provider>
    </KitchensImInContext.Provider>
    // </NavigationContainer>
  );
};

export default KitchenStack;
