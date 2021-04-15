import React, {useState, useContext, useEffect} from 'react';
import type {Node} from 'react';
import {View, Text, Button, TouchableOpacity, Keyboard} from 'react-native';

import Input from '../components/Input';
import {useQuery, useMutation, useQueryClient} from 'react-query';
// import {postRecipe} from '../utils/API';

import UserContext from '../utils/UserContext';
import axios from 'axios';
import {styles} from '../utils/styles';
import AddPeopleOrRecipes from '../components/AddPeopleOrRecipes';

const CreateRecipe = props => {
  const queryClient = useQueryClient();
  const {user} = useContext(UserContext);
  const [length, setLength] = useState();

  // const [payload, setPayload] = useState({
  //   title: '',
  //   instructions: '',
  //   author: user.username ? user.username : '',
  //   authorId: user.id ? user.id : '',
  // });
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setingredients] = useState([]);
  const [ingredInput, setingredInput] = useState('');
  const [author, setAuthor] = useState(user.username ? user.username : '');
  const [authorId, setAuthorId] = useState(user.id ? user.id : '');
  const {kitchen, recipes} = props.route.params;
  // console.log(kitchen);
  const [errorToast, setErrorToast] = useState(false);

  useEffect(() => {
    return () => console.log('cleanup createRecipe');
  }, []);

  useEffect(() => {
    setLength(ingredients.length);
    return () => {};
  }, [ingredients]);

  const mutationToKitchen = useMutation(
    payload =>
      axios.post(
        `http://192.168.56.1:3001/api/kitchen/newrecipe/${kitchen}`,
        payload,
      ),
    {
      onMutate: variables => {
        // A mutation is about to happen!
        // Optionally return a context containing data to use when for example rolling back
        // return {id: 1};
        recipes.push(variables);
        return variables;
      },
      onSuccess: () => {
        queryClient.invalidateQueries('recipes');
        // console.log(e.data);
        // recipes.push(e);
        setTitle('');
        setInstructions('');
        setingredInput('');
        // setPayload({
        //   title: '',
        //   instructions: '',
        // });
        Keyboard.dismiss();
        props.navigation.navigate('Kitchens', {screen: 'Manage Kitchens'});
      },
      onError: (error, variables, context) => {
        // An error happened!

        console.log(`rolling back optimistic update with id ${context.id}`);
      },
    },
  );

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
        // setPayload({
        //   title: '',
        //   instructions: '',
        // });
        setingredInput('');
        setTitle('');
        setInstructions('');
        Keyboard.dismiss();
        props.navigation.navigate('All Recipes');
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
    // setPayload({...payload, title: e});
    setTitle(e);
  };
  const handleInstructionsChange = e => {
    setErrorToast(false);

    // setPayload({...payload, instructions: [...payload.instructions, e]});
    // setPayload({...payload, instructions: e});
    setInstructions(e);
  };

  const handleSubmit = e => {
    if (title != '' && instructions != '' && !kitchen) {
      let payload = {
        title,
        instructions,
        author,
        ingredients,
        authorId,
      };
      mutation.mutate(payload, user.id);
      return;
    }
    if (title != '' && instructions != '' && kitchen) {
      let payload = {
        title,
        instructions,
        author,
        ingredients,
        authorId,
      };
      mutationToKitchen.mutate(payload, kitchen);
      return;
      // FIXME:
      // axios
      //   .post(
      //     `http://192.168.56.1:3001/api/kitchen/newrecipe/${kitchen}`,
      //     payload,
      //   )
      //   .then(res => console.log(res.data));
    }
    // TODO: set an error toast saying enter all shit
  };

  return (
    <View style={styles.flexColContainer}>
      <Input
        label="Dish Name"
        value={title}
        onChangeText={handleTitleInputChange}
        inputStyles={styles.inputStyles}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSubmit}
      />
      {/* {} */}
      <Input
        label="Instructions"
        value={instructions}
        onChangeText={handleInstructionsChange}
        inputStyles={styles.textarea}
        // placeHolder=""
        // onSubmitEditing={handleSubmit}
        viewStyles={styles.viewStyles}
        multiline={true}
        numberOfLines={10}
      />

      <Input
        label="Ingredients"
        value={ingredInput}
        onChangeText={setingredInput}
        inputStyles={styles.inputStyles}
        // onSubmitEditing={}
      />
      <TouchableOpacity style={styles.buttonTiny}>
        <Button
          onPress={() => {
            setingredients(ingredients => [...ingredients, ingredInput]);
            setingredInput('');
          }}
          title="+"
          color="#318ce7"
          accessibilityLabel="Submit a new recipe"
        />
      </TouchableOpacity>
      <Text>
        {ingredients &&
          ingredients.map((i, index) => (
            <Text style={{color: 'white', fontSize: 16}} key={i}>
              {i}
              {index !== length - 1 ? ', ' : ' '}
            </Text>
          ))}
      </Text>
      {errorToast && <Text>Please enter all info</Text>}
      <TouchableOpacity style={styles.buttonBtm}>
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

export default CreateRecipe;
