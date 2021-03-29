import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Input from '../components/Input';
import {registerUser} from '../utils/API';
import {useMutation} from 'react-query';

const Login = () => {
  //   const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorModal, setErrorModal] = useState(false);

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

  //   const handleRegisterSubmit = e => {
  //     registerUser(userInfo)
  //       .then(res => {
  //         console.log(res.data);
  //         setUserInfo({
  //           username: '',
  //           email: '',
  //           password: '',
  //         });
  //       })
  //       .catch(err => {
  //         // console.log(err);

  //         setErrorModal(true);
  //       });
  //   };

  return (
    <View>
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
      <Button
        onPress={e => {
          e.persist();
          mutation.mutate(userInfo);
        }}
        title="Register"
        color="navy"
        style={styles.button}
        accessibilityLabel="submit registration"
      />
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
    // flex: 1,
    // marginTop: 40,
    // width: 120,
    // height: 25,
    // backgroundColor: 'black',
  },

  button: {
    marginTop: 5,
    width: 300,
  },
});

export default Login;
