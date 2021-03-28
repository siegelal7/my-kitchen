import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.56.1:3001/api/recipes')
      .then(res => setAllRecipes(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={styleYo.container}>
      {allRecipes.map(i => (
        <Text key={i._id}>{i.title}</Text>
      ))}
    </View>
  );
};

const styleYo = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default Home;
