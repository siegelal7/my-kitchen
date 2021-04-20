import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useQuery} from 'react-query';
import Recipes from './Recipes';
import CreateRecipe from './CreateRecipe';
import KitchensContext from '../utils/KitchensContext';
// import KitchenStack from './KitchenStack';

const RecipeStack = createStackNavigator();

const RecipesStack = () => {
  const [myKitchens, setMyKitchens] = React.useState([]);
  React.useEffect(() => {
    return () => console.log('cleanup recipeStack');
  }, []);
  return (
    <KitchensContext.Provider value={{myKitchens, setMyKitchens}}>
      <RecipeStack.Navigator initialRouteName="All Recipes">
        <RecipeStack.Screen name="All Recipes" component={Recipes} />
        <RecipeStack.Screen name="New Recipe" component={CreateRecipe} />
        {/* <ProfStack.Screen name="Search Users" component={SearchUsers} /> */}
        {/* <RecipeStack.Screen name="Kitchen Stack" component={KitchenStack} /> */}
        {/* <ProfStack.Screen name="Create a Kitchen" component={CreateKitchen} /> */}
        {/* <ProfStack.Screen name="Manage Kitchens" component={ManageKitchens} /> */}
      </RecipeStack.Navigator>
    </KitchensContext.Provider>
  );
};

export default RecipesStack;
