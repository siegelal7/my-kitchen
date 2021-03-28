import React from 'react';
import {TextInput, Text, View} from 'react-native';

const Input = ({label, value, onChangeText, placeHolder, allStyles}) => {
  // const {labelStyles, inputStyles, viewStyles} = allStyles;
  // console.log(allStyles.viewStyles);
  return (
    <View style={allStyles.viewStyles ? allStyles.viewStyles : {marginTop: 14}}>
      {label ? (
        <Text
          // style={labelStyles}
          style={{fontWeight: 'bold'}}>
          {label}
        </Text>
      ) : (
        ''
      )}
      <TextInput
        // secureTextEntry={secureTextEntry}
        autoCorrect={false}
        autofocus={true}
        placeholder={placeHolder}
        style={
          allStyles.inputStyles ? allStyles.inputStyles : {marginBottom: 10}
        }
        onChangeText={onChangeText}
        value={value}
        // keyboardType="default"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default Input;
