import React, {useContext, useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SearchUsers from './SearchUsers';
import CreateKitchen from './CreateKitchen';
import ManageKitchens from './ManageKitchens';

import Kitchen from './Kitchen';

const KitchStack = createStackNavigator();

const KitchenStack = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <KitchStack.Navigator initialRouteName="Manage Kitchens">
      <KitchStack.Screen name="Manage Kitchens" component={ManageKitchens} />
      <KitchStack.Screen name="Search Users" component={SearchUsers} />
      <KitchStack.Screen name="Create a Kitchen" component={CreateKitchen} />
      <KitchStack.Screen name="Grocery List" component={Kitchen} />
    </KitchStack.Navigator>
  );
};

export default KitchenStack;
