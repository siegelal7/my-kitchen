import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import {getRecipes} from '../utils/API';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);

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

  // console.log(data.data);

  // useEffect(() => {
  //   axios
  //     .get('http://192.168.56.1:3001/api/recipes')
  //     .then(res => setAllRecipes(res.data))
  //     .catch(err => console.log(err));
  // }, []);
  return (
    <View style={styleYo.container}>
      {data.data.map(i => (
        <View key={i._id} style={{marginTop: 7}}>
          <Text style={{fontWeight: 'bold'}}>{i.title}</Text>
          <Text>{i.instructions}</Text>
        </View>
      ))}
      {/* {allRecipes.map(i => (
        <View key={i._id} style={{marginTop: 7}}>
          <Text style={{fontWeight: 'bold'}}>{i.title}</Text>
          <Text>{i.instructions}</Text>
        </View>
      ))} */}
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
