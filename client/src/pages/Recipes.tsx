import React, {useState, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
// import Input from '../components/Input';
import {getRecipes, searchForUser} from '../utils/API';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
// import UserContext from '../utils/UserContext';

const Recipes = ({navigation}) => {
  const {user} = useContext(UserContext);
  const {isLoading, status, data, isFetching, isError, error} = useQuery(
    'recipes',
    getRecipes,
  );

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
        <Text>Add some recipes!</Text>
      </View>
    );
  }

  const max = data.data.length;

  return (
    <ScrollView style={styles.container}>
      {data.data.map((i, index) => (
        <View
          key={i._id}
          style={max - 1 == index ? styles.recipeCardBtm : styles.recipeCard}>
          <View style={styles.recipeInfo}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>{i.title} </Text>
            <Text style={{color: 'white'}}>from {i.author}</Text>
          </View>
          <Text style={{marginBottom: 5, color: 'white'}}>
            {i.instructions}
          </Text>
        </View>
      ))}
      {user.username && (
        <Text
          style={styles.bottomLink}
          onPress={() => {
            navigation.navigate('New Recipe');
          }}>
          Add a Recipe
        </Text>
      )}
    </ScrollView>
  );
};

export default Recipes;
