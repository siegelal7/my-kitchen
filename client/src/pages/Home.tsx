import React, {useState, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import Input from '../components/Input';
import {getRecipes, searchForUser} from '../utils/API';
import {styles} from '../utils/styles';
// import UserContext from '../utils/UserContext';

const Home = () => {
  // const [allRecipes, setAllRecipes] = useState([]);
  // const [searchValue, setSearchValue] = useState('');
  // const {user} = useContext(UserContext);

  // const queryClient = useQueryClient();

  // const handleTitleInputChange = e => {
  //   setSearchValue(e);
  // };

  // const handleSearchSubmit = e => {
  //   setSearchValue('');
  //   searchForUser(searchValue).then(res => console.log(res.data));
  // };

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

  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      {/* <Input
        // label="Dish Name"
        value={searchValue}
        onChangeText={handleTitleInputChange}
        inputStyles={styleYo.inputStyles}
        viewStyles={styleYo.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSearchSubmit}
      /> */}
      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
      {data.data.map(i => (
        <View key={i._id} style={styles.recipeCard}>
          <View style={styles.recipeInfo}>
            <Text style={{fontWeight: 'bold'}}>{i.title} </Text>
            <Text>from {i.author}</Text>
          </View>
          <Text style={{marginBottom: 5}}>{i.instructions}</Text>
        </View>
      ))}
      {/* </ScrollView> */}
    </ScrollView>
  );
};

export default Home;
