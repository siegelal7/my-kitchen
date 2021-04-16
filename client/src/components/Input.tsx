import React from 'react';
import {TextInput, Text, View} from 'react-native';

const Input = ({
  label,
  value,
  viewStyles,
  onChangeText,
  placeholder,
  inputStyles,
  onSubmitEditing,
  multiline,
  numberOfLines,
  secureTextEntry,
}) => {
  React.useEffect(() => {
    return () => console.log('unmounting Input cmponent');
  }, []);
  // const {labelStyles, inputStyles, viewStyles} = allStyles;
  // console.log(allStyles.viewStyles);
  return (
    <View style={viewStyles ? viewStyles : {marginTop: 14}}>
      {label ? (
        <Text
          // style={labelStyles}
          style={{fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
          {label}
        </Text>
      ) : null}
      <TextInput
        // secureTextEntry={secureTextEntry}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        autoCorrect={false}
        autofocus={true}
        placeholder={placeholder}
        style={inputStyles ? inputStyles : {marginBottom: 10}}
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
