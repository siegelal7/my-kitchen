import React from 'react';
import {TextInput, Text, View} from 'react-native';

const Input = ({
  label,
  value,
  viewStyles,
  onChangeText,
  placeholder,
  allStyles,
  onSubmitEditing,
  multiline,
  numberOfLines,
  secureTextEntry,
}) => {
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
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        autoCorrect={false}
        autofocus={true}
        placeholder={placeholder}
        style={allStyles ? allStyles : {marginBottom: 10}}
        onChangeText={e => onChangeText(e)}
        onSubmitEditing={onSubmitEditing && onSubmitEditing}
        value={value && value}
        // keyboardType="default"
        multiline={multiline ? true : false}
        numberOfLines={numberOfLines && numberOfLines}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default Input;
