import React, {useEffect, useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import SingleRecipeCard from '../components/SingleRecipeCard';
// import Input from '../components/Input';
import {getRecipes, searchForUser} from '../utils/API';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
// import UserContext from '../utils/UserContext';

const Recipes = ({navigation}) => {
  const {user} = useContext(UserContext);

  const [max, setMax] = useState();

  const {isLoading, status, data, isFetching, isError, error} = useQuery(
    'recipes',
    getRecipes,
  );

  useEffect(() => {
    // const max = data.data.length;
    if (data) {
      setMax(data.data.length);
    }

    return () => console.log('cleanup Recipes');
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.flexColContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.flexColContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (data.data.length === 0) {
    return (
      <View style={styles.flexColContainer}>
        <Text style={{color: 'white', fontSize: 24}}>Add some recipes!</Text>
        {user.username && (
          <Text
            style={styles.bottomLink}
            onPress={() => {
              navigation.navigate('New Recipe', {
                recipes: null,
                kitchen: null,
              });
            }}>
            Add a Recipe
          </Text>
        )}
      </View>
    );
  }

  // const max = data.data.length;

  return (
    <ScrollView style={styles.container}>
      {data.data.map((i, index) => (
        <SingleRecipeCard key={i._id} i={i} index={index} max={max} />
      ))}
      {user.username && (
        <Text
          style={styles.bottomLink}
          onPress={() => {
            navigation.navigate('New Recipe', {
              recipes: null,
              kitchen: null,
            });
          }}>
          Add a Recipe
        </Text>
      )}
    </ScrollView>
  );
};

export default Recipes;
