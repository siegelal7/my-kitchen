import React, {useState, useContext} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import Input from './Input';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {postRecipe} from '../utils/API';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../utils/UserContext';
import axios from 'axios';

const RecipeEntry = () => {
  const queryClient = useQueryClient();
  const {user} = useContext(UserContext);
  const [payload, setPayload] = useState({
    title: '',
    instructions: '',
    author: user.user.username ? user.user.username : '',
    authorId: user.user.id ? user.user.id : '',
  });
  // console.log(user.user.username);
  const [errorToast, setErrorToast] = useState(false);
  const navigation = useNavigation();

  // const postRecipe = data => {
  //   axios.post('http://192.168.56.1:3001/api/recipes', data);
  // };

  const mutation = useMutation(
    payload =>
      axios.post(
        `http://192.168.56.1:3001/api/recipes/${user.user.id}`,
        payload,
      ),
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
      mutation.mutate(payload, user.user.id);
    }
    // TODO: set an error toast saying enter all shit
  };

  return (
    <View style={styles.MainContainer}>
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
          color="navy"
          accessibilityLabel="Submit a new recipe"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyles: {
    // backgroundColor: 'aqua',
    borderColor: '#555555',
    borderWidth: 1,
    height: 40,
    width: 300,
    marginBottom: 25,
    color: 'black',
  },
  labelStyles: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  viewStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  textarea: {
    // height: 120,
    textAlignVertical: 'top',
    width: 300,
    borderColor: '#555555',
    borderWidth: 1,
    // backgroundColor: 'lightgreen',
  },
  button: {
    marginTop: 10,
    width: 100,
  },
});

export default RecipeEntry;
