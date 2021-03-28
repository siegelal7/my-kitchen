import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import axios from 'axios';
import Input from './Input';
// import View from 'react-native-gesture-handler/lib/typescript/GestureHandlerRootView';

const styles = StyleSheet.create({
  inputStyles: {
    backgroundColor: 'aqua',
    height: 40,
    width: 200,
    marginBottom: 25,
    color: 'black',
  },
  labelStyles: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  viewStyles: {
    marginTop: 40,
    width: 120,
    height: 25,
    // backgroundColor: 'black',
  },
  textarea: {
    height: 50,
    width: 200,
    backgroundColor: 'lightgreen',
  },
});

const RecipeEntry = () => {
  const [payload, setPayload] = useState({
    title: '',
    instructions: '',
  });

  const handleTitleInputChange = e => {
    // console.log(e.target.);
    setPayload({...payload, title: e});
  };
  const handleInstructionsChange = e => {
    setPayload({...payload, instructions: [...payload.instructions, e]});
  };

  const handleSubmit = e => {
    // console.log(payload);
    axios
      .post('http://192.168.56.1:3001/api/recipes', payload)
      .then(res => {
        setPayload({...payload, title: ''});
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Input
        label="Fart"
        value={payload.title}
        onChangeText={handleTitleInputChange}
        allStyles={styles}
        placeHolder="Queef"
      />
      {/* {} */}
      <Input
        label="1"
        value={payload.instructions}
        onChangeText={handleInstructionsChange}
        allStyles={styles}
        placeHolder="one"
      />
      {/* <Input
        label="2"
        value={payload.instructions[1]}
        onChangeText={handleInstructionsChange}
        allStyles={styles}
        placeHolder="two"
      />
      <Input
        label="3"
        value={payload.instructions[2]}
        onChangeText={handleInstructionsChange}
        allStyles={styles}
        placeHolder="three"
      /> */}
    </>
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

export default RecipeEntry;
