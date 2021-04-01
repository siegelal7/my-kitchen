import axios from 'axios';
import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import {getRecipes} from '../utils/API';
import UserContext from '../utils/UserContext';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const {user} = useContext(UserContext);

  // const getRecipes = async () => {
  //   const response = await axios.get('http://192.168.56.1:3001/api/recipes');
  //   return response;
  // };

  const queryClient = useQueryClient();
  // const query = useQuery('recipes', getRecipes);
  const {isLoading, status, data, isFetching, isError, error} = useQuery(
    'recipes',
    getRecipes,
  );
  // const mutation = useMutation(postRecipe, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('recipes');
  //   },
  // });
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  // if (isFetching)

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styleYo.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {data.data.map(i => (
          <View key={i._id} style={{marginTop: 7}}>
            <Text style={{fontWeight: 'bold'}}>{i.title}</Text>
            <Text style={{marginBottom: 5}}>{i.instructions}</Text>
          </View>
        ))}
      </ScrollView>

      {/* {allRecipes.map(i => (
        <View key={i._id} style={{marginTop: 7}}>
          <Text style={{fontWeight: 'bold'}}>{i.title}</Text>
          <Text>{i.instructions}</Text>
        </View>
      ))} */}
    </View>
  );
};
const screenHeight = Dimensions.get('window').height;

const styleYo = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
    height: screenHeight,
    paddingBottom: 100,
    // marginBottom: 200,
    // backgroundColor: '#dcedc8',
  },
});

export default Home;
