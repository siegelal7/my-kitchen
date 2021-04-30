import React from 'react';
import {View, Button, TouchableOpacity} from 'react-native';
import {styles} from '../utils/styles';
// import {styles} from '../utils/styles';

const AddPeopleOrRecipes = ({
  navigation,
  owner,
  name,
  participants,
  groceryList,
  recipes,
  _id,
}) => {
  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <View
      key={_id}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
      }}>
      <TouchableOpacity style={styles.button}>
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
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
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
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(AddPeopleOrRecipes);
