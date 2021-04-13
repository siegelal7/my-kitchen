import React, {useState, useContext} from 'react';
import type {Node} from 'react';
import {View, Text, Button, TouchableOpacity, Keyboard} from 'react-native';

import Input from '../components/Input';
import {useQuery, useMutation, useQueryClient} from 'react-query';
// import {postRecipe} from '../utils/API';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import {styles} from '../utils/styles';

const RecipeEntry = () => {
  const queryClient = useQueryClient();
  const {user} = useContext(UserContext);
  const [payload, setPayload] = useState({
    title: '',
    instructions: '',
    author: user.username ? user.username : '',
    authorId: user.id ? user.id : '',
  });
  // console.log(user.user.username);
  const [errorToast, setErrorToast] = useState(false);
  const navigation = useNavigation();

  // const postRecipe = data => {
  //   axios.post('http://192.168.56.1:3001/api/recipes', data);
  // };

  const mutation = useMutation(
    payload =>
      axios.post(`http://192.168.56.1:3001/api/recipes/${user.id}`, payload),
    {
      onMutate: variables => {
        // A mutation is about to happen!
        // Optionally return a context containing data to use when for example rolling back
        // return {id: 1};
        return variables;
      },
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
        setPayload({
          title: '',
          instructions: '',
        });
        Keyboard.dismiss();
        navigation.navigate('All Recipes');
      },
      onError: (error, variables, context) => {
        // An error happened!

        console.log(`rolling back optimistic update with id ${context.id}`);
      },
    },
  );

  const handleTitleInputChange = e => {
    // console.log(e.target.);
    setErrorToast(false);
    setPayload({...payload, title: e});
  };
  const handleInstructionsChange = e => {
    setErrorToast(false);

    // setPayload({...payload, instructions: [...payload.instructions, e]});
    setPayload({...payload, instructions: e});
  };

  const handleSubmit = e => {
    if (payload.title != '' && payload.instructions != '') {
      mutation.mutate(payload, user.id);
    }
    // TODO: set an error toast saying enter all shit
  };

  return (
    <View style={styles.flexColContainer}>
      <Input
        label="Dish Name"
        value={payload.title}
        onChangeText={handleTitleInputChange}
        inputStyles={styles.inputStyles}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSubmit}
      />
      {/* {} */}
      <Input
        label="Instructions"
        value={payload.instructions}
        onChangeText={handleInstructionsChange}
        inputStyles={styles.textarea}
        // placeHolder=""
        // onSubmitEditing={handleSubmit}
        viewStyles={styles.viewStyles}
        multiline={true}
        numberOfLines={10}
      />
      {errorToast && <Text>Please enter all info</Text>}
      <TouchableOpacity style={styles.button}>
        <Button
          onPress={handleSubmit}
          title="Serve"
          color="#318ce7"
          accessibilityLabel="Submit a new recipe"
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecipeEntry;
