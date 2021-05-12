import React, {useState, useContext, useEffect} from 'react';
// import type {Node} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Input from '../components/Input';
import {useMutation, useQueryClient} from 'react-query';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import {styles} from '../utils/styles';

import {fetchKitchens, postRecipeToKitchen} from '../utils/API';
import KitchensContext from '../utils/KitchensContext';
import {foodChoicesRecipeEntry} from '../utils/foodCategories';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CreateRecipe = props => {
  const queryClient = useQueryClient();
  const {user} = useContext(UserContext);
  const {setMyKitchens} = useContext(KitchensContext);
  const [length, setLength] = useState();

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setingredients] = useState([]);
  const [ingredInput, setingredInput] = useState('');
  const [author, setAuthor] = useState(user.username ? user.username : '');
  const [authorId, setAuthorId] = useState(user.id ? user.id : '');
  const {kitchen, recipes} = props.route.params;

  const [image, setImage] = useState({});

  const [errorToast, setErrorToast] = useState(false);

  useEffect(() => {
    setLength(ingredients.length);
    return () => {};
  }, [ingredients]);

  const mutationToKitchen = useMutation(
    payload => postRecipeToKitchen(kitchen, payload),

    {
      onMutate: variables => {
        // A mutation is about to happen!
        // Optionally return a context containing data to use when for example rolling back
        // return {id: 1};
        // console.log(variables);
        recipes.push(variables);
        return variables;
      },
      onSuccess: async () => {
        queryClient.invalidateQueries('limited-recipes');
        // console.log(e.data);
        // recipes.push(payload);
        await fetchKitchens(user.id).then(nowNow => {
          const mine = nowNow.data.kitchens.filter(m => m.owner === user.id);

          setMyKitchens(mine);
        });
        setTitle('');
        setInstructions('');
        setingredients([]);
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
      axios.post(`http://10.0.0.50:3001/api/recipes/${user.id}`, payload),
    {
      onMutate: variables => {
        // A mutation is about to happen!
        // Optionally return a context containing data to use when for example rolling back
        // return {id: 1};

        return variables;
      },
      onSuccess: () => {
        queryClient.invalidateQueries('limited-recipes');
        // setPayload({
        //   title: '',
        //   instructions: '',
        // });
        setingredInput('');
        setTitle('');
        setingredients([]);
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

  const handleSubmit = async () => {
    if (title !== '' && instructions != '') {
      let payload = {
        title,
        instructions,
        category,
        author,
        ingredients,
        authorId,
      };
      // New Recipe to a kitchen- didnt work once the rec got added but not showing frontend
      if (kitchen) {
        mutationToKitchen.mutate(payload, kitchen);
        return;
      }

      // just creating a recipe not attached to any kitchen
      mutation.mutate(payload, user.id);
      return;
    }

    // TODO: set an error toast saying enter all shit
    setErrorToast(true);
  };

  const handleAddIngredToArray = () => {
    if (ingredInput !== '' && !ingredients.includes(ingredInput)) {
      setingredients(ingredients => [...ingredients, ingredInput]);
      setingredInput('');
    }
  };

  const callback = response => {
    // console.log(response);
    setImage(response);
  };

  useEffect(() => {
    // TODO: here
    if (image) console.log(image.uri);
    return () => {};
  }, [image]);

  return (
    <ScrollView style={styles.scrollScreen}>
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
        <ModalDropdown
          onSelect={(index, value) => setCategory(value)}
          // multipleSelect={true}
          options={foodChoicesRecipeEntry}
          textStyle={{fontSize: 16, width: 300, textAlign: 'center'}}
          dropdownStyle={{
            fontSize: 16,
            width: 300,
            // width: 150,
            // marginLeft: 75,
          }}
          style={{
            height: 40,
            width: 300,
            backgroundColor: 'white',
            color: '#30363a',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
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

        <View style={styles.buttonInputRow}>
          <Input
            label="Ingredients"
            value={ingredInput}
            onChangeText={setingredInput}
            inputStyles={styles.inputStyles}
            // onSubmitEditing={}
          />
          <TouchableOpacity style={{position: 'relative', top: 3, left: 3}}>
            <Button
              onPress={handleAddIngredToArray}
              title="+"
              color="#318ce7"
              accessibilityLabel="Submit a new recipe"
            />
          </TouchableOpacity>
        </View>
        <Text>
          {ingredients &&
            ingredients.map((i, index) => (
              <Text style={{color: 'white', fontSize: 16}} key={i}>
                {i}
                {index !== length - 1 ? ', ' : ' '}
              </Text>
            ))}
        </Text>
        <TouchableOpacity style={{overflow: 'hidden', borderRadius: 10}}>
          <Button
            title="Add Image"
            onPress={() => {
              launchCamera({mediaType: 'photo'}, callback);
            }}
            color="#318ce7"
          />
        </TouchableOpacity>
        {image?.uri && (
          <View style={{height: '100%', width: '100%'}}>
            <Text style={{color: 'white'}}>{image.fileName}</Text>
            <Image source={image.fileName} style={{height: 100, width: 100}} />
          </View>
        )}
        {errorToast && (
          <Text style={{fontSize: 16, color: 'white'}}>
            Please enter all info
          </Text>
        )}
        <TouchableOpacity style={styles.buttonBtm}>
          <Button
            onPress={handleSubmit}
            title="Serve"
            color="#318ce7"
            accessibilityLabel="Submit a new recipe"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateRecipe;
