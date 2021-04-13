import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useQuery} from 'react-query';
import Recipes from './Recipes';
import RecipeEntry from './RecipeEntry';

const RecipeStack = createStackNavigator();

const RecipesStack = () => {
  return (
    <RecipeStack.Navigator initialRouteName="All Recipes">
      <RecipeStack.Screen name="All Recipes" component={Recipes} />
      <RecipeStack.Screen name="New Recipe" component={RecipeEntry} />
      {/* <ProfStack.Screen name="Search Users" component={SearchUsers} /> */}
      {/* <RecipeStack.Screen name="Kitchen Stack" component={KitchenStack} /> */}
      {/* <ProfStack.Screen name="Create a Kitchen" component={CreateKitchen} /> */}
      {/* <ProfStack.Screen name="Manage Kitchens" component={ManageKitchens} /> */}
    </RecipeStack.Navigator>
  );
};

export default RecipesStack;
