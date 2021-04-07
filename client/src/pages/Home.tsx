import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import Input from '../components/Input';
import {getRecipes, searchForUser} from '../utils/API';
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
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styleYo.container}>
      {/* <Input
        // label="Dish Name"
        value={searchValue}
        onChangeText={handleTitleInputChange}
        inputStyles={styleYo.inputStyles}
        viewStyles={styleYo.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSearchSubmit}
      /> */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {data.data.map(i => (
          <View
            key={i._id}
            style={{marginTop: 5, borderWidth: 1, paddingHorizontal: 5}}>
            <View
              style={{flexDirection: 'row', flewWrap: 'wrap', marginBottom: 5}}>
              <Text style={{fontWeight: 'bold'}}>{i.title} </Text>
              <Text>from {i.author}</Text>
            </View>
            <Text style={{marginBottom: 5}}>{i.instructions}</Text>
          </View>
        ))}
      </ScrollView>
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
  inputStyles: {
    borderColor: '#555555',
    borderWidth: 1,
    height: 40,
    width: 300,
    marginBottom: 25,
    color: 'black',
  },
  viewStyle: {},
});

export default Home;
