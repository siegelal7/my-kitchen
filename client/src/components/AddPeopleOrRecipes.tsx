import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../utils/styles';

const AddPeopleOrRecipes = ({
  navigation,
  owner,
  user,
  name,
  participants,
  groceryList,
  recipes,
  _id,
}) => {
  //   console.log(recipes);
  React.useEffect(() => {
    return () => console.log('cleanup addPplOrRec');
  }, []);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
      }}>
      <Button
        color="#318ce7"
        onPress={() =>
          navigation.navigate('Search Users', {
            info: {
              groceryList: groceryList,
              name: name,
              _id: _id,
              participants: participants,
              owner: owner,
            },
          })
        }
        title="Add user"
      />
      <Button
        color="#318ce7"
        onPress={() =>
          navigation.navigate('Recipes', {
            screen: 'New Recipe',
            params: {kitchen: _id, recipes: recipes},
          })
        }
        title="Add Dish"
      />
    </View>
  );
};

export default AddPeopleOrRecipes;