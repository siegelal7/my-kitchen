import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {TextInput, StyleSheet, View, Text, Button} from 'react-native';
import axios from 'axios';
import Input from './Input';
import {useQuery, useMutation, useQueryClient} from 'react-query';
// import View from 'react-native-gesture-handler/lib/typescript/GestureHandlerRootView';
import {postRecipe} from '../utils/API';

const RecipeEntry = () => {
  const queryClient = useQueryClient();
  const [payload, setPayload] = useState({
    title: '',
    instructions: '',
  });
  const [errorToast, setErrorToast] = useState(false);

  // const postRecipe = data => {
  //   axios.post('http://192.168.56.1:3001/api/recipes', data);
  // };
  const mutation = useMutation(postRecipe, {
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
    },
    onError: (error, variables, context) => {
      // An error happened!

      console.log(`rolling back optimistic update with id ${context.id}`);
    },
  });
  // const mutation = useMutation(newTodo => axios.post('/todos', newTodo));

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
    // console.log(payload);
    // if (payload.title !== '' && payload.instructions !== '') {
    //   axios
    //     .post('http://192.168.56.1:3001/api/recipes', payload)
    //     .then(res => {
    //       setPayload({title: '', instructions: ''});
    //       console.log(res.data);
    //       //   return;
    //     })
    //     .catch(err => {
    //       console.log(err.message);
    //     });
    // } else {
    //   setErrorToast(true);
    // }
    mutation.mutate(payload);
    // setPayload
    // if (mutation.isSuccess) {
    //   setPayload({
    //     title: '',
    //     instructions: '',
    //   });
    // }
  };

  return (
    <View style={styles.MainContainer}>
      <Input
        label="Dish Name"
        value={payload.title}
        onChangeText={handleTitleInputChange}
        allStyles={styles.inputStyles}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSubmit}
      />
      {/* {} */}
      <Input
        label="Instructions"
        value={payload.instructions}
        onChangeText={handleInstructionsChange}
        allStyles={styles.textarea}
        // placeHolder=""
        onSubmitEditing={handleSubmit}
        viewStyles={styles.viewStyles}
        multiline={true}
        numberOfLines={10}
      />
      {errorToast && <Text>Please enter all info</Text>}
      <Button
        onPress={handleSubmit}
        title="Serve"
        color="navy"
        style={styles.button}
        accessibilityLabel="Submit a new recipe"
      />
    </View>
    // <TextInput
    //   style={styles.input}
    //   autofocus={true}
    //   //   placeholder="test"
    //   onChangeText={handleInputChange}
    //   value={payload.title}
    //   onSubmitEditing={handleSubmit}
    //   underlineColorAndroid="transparent"
    // />
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
    // flex: 1,
    // marginTop: 40,
    // width: 120,
    // height: 25,
    // backgroundColor: 'black',
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
    marginTop: 5,
  },
});

export default RecipeEntry;
