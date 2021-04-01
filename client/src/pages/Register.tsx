import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity} from 'react-native';
import Input from '../components/Input';
import {registerUser} from '../utils/API';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  //   const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorModal, setErrorModal] = useState(false);
  const navigation = useNavigation();

  const mutation = useMutation(registerUser, {
    onMutate: variables => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      // return {id: 1};
      return variables;
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries('recipes');
      setUserInfo({
        username: '',
        email: '',
        password: '',
      });
    },
    onError: (error, variables, context) => {
      // An error happened!
      setErrorModal(true);
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
  });

  return (
    <View style={styles.viewStyles}>
      <Input
        label="username"
        value={userInfo.username}
        onChangeText={e => {
          setErrorModal(false);
          setUserInfo({...userInfo, username: e});
        }}
        // onSubmitEditing={mutation.mutate(userInfo)}
        allStyles={styles.inputStyles}
      />
      <Input
        label="email"
        value={userInfo.email}
        onChangeText={e => {
          setErrorModal(false);
          setUserInfo({...userInfo, email: e});
        }}
        // onSubmitEditing={mutation.mutate(userInfo)}
        allStyles={styles.inputStyles}
      />
      <Input
        label="password"
        value={userInfo.password}
        onChangeText={e => {
          setErrorModal(false);
          setUserInfo({...userInfo, password: e});
        }}
        secureTextEntry={true}
        // onSubmitEditing={mutation.mutate(userInfo)}
        allStyles={styles.inputStyles}
      />
      {errorModal && <Text>Try again!</Text>}
      <TouchableOpacity style={styles.button}>
        <Button
          onPress={e => {
            e.persist();
            mutation.mutate(userInfo);
          }}
          title="Register"
          color="navy"
          accessibilityLabel="submit registration"
        />
      </TouchableOpacity>

      <Text
        style={styles.linkStyles}
        onPress={() => navigation.navigate('Login')}>
        Already have an account? Login Here
      </Text>
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
  linkStyles: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
  },
  button: {
    display: 'flex',
    marginTop: 5,
    // width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
