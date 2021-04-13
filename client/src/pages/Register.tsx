import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import {registerUser} from '../utils/API';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import UserContext from '../utils/UserContext';
import {styles} from '../utils/styles';

const Register = () => {
  //   const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorModal, setErrorModal] = useState(false);
  const {setUser} = useContext(UserContext);
  const navigation = useNavigation();

  const mutation = useMutation(registerUser, {
    onMutate: variables => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      // return {id: 1};

      return variables;
    },
    onSuccess: r => {
      //   queryClient.invalidateQueries('recipes');
      setUser(r.data);
      setUserInfo({
        username: '',
        email: '',
        password: '',
      });
      Keyboard.dismiss();
      navigation.navigate('All Recipes');
    },
    onError: (error, variables, context) => {
      // An error happened!
      setErrorModal(true);
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
  });

  return (
    <View style={styles.flexFullCenter}>
      <Input
        label="username"
        value={userInfo.username}
        onChangeText={e => {
          setErrorModal(false);
          setUserInfo({...userInfo, username: e});
        }}
        // onSubmitEditing={mutation.mutate(userInfo)}
        inputStyles={styles.inputStyles}
      />
      <Input
        label="email"
        value={userInfo.email}
        onChangeText={e => {
          setErrorModal(false);
          setUserInfo({...userInfo, email: e});
        }}
        // onSubmitEditing={mutation.mutate(userInfo)}
        inputStyles={styles.inputStyles}
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
        inputStyles={styles.inputStyles}
      />
      {errorModal && <Text>Try again!</Text>}
      <TouchableOpacity style={styles.button}>
        <Button
          onPress={e => {
            e.persist();
            mutation.mutate(userInfo);
          }}
          title="REGISTER"
          color="#318ce7"
          accessibilityLabel="submit registration"
        />
      </TouchableOpacity>

      <Text style={styles.bigLink} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login Here
      </Text>
    </View>
  );
};

export default Register;
