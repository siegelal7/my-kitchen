import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Button, Keyboard} from 'react-native';
import Input from '../components/Input';
import {useMutation} from 'react-query';
import {loginUser} from '../utils/API';
// import {useNavigation} from '@react-navigation/native';
import UserContext from '../utils/UserContext';
import {styles} from '../utils/styles';

// const LoginStack = createStackNavigator();
const Login = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const {setUser} = useContext(UserContext);
  // const navigation = useNavigation();

  // const handleLoginSubmit = e => {
  //   e.preventDefault();
  //   console.log(userInfo);
  // };
  const mutation = useMutation(loginUser, {
    onMutate: variables => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      // return {id: 1};
      return variables;
    },
    onSuccess: r => {
      //   queryClient.invalidateQueries('recipes');
      setUserInfo({
        email: '',
        password: '',
      });
      setUser(r.data);

      Keyboard.dismiss();
      navigation.navigate('All Recipes');
    },
    onError: (error, variables, context) => {
      // An error happened!
      // setErrorModal(true);
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
  });

  return (
    <View style={styles.flexColContainer}>
      <Input
        label="Email"
        // onSubmitEditing={mutation.mutate(userInfo)}
        // placeholder="email"
        inputStyles={styles.inputStyles}
        value={userInfo.email}
        onChangeText={e => {
          setUserInfo({...userInfo, email: e});
        }}
      />
      <Input
        label="Password"
        // onSubmitEditing={mutation.mutate(userInfo)}
        // placeholder="password"
        inputStyles={styles.inputStyles}
        secureTextEntry={true}
        value={userInfo.password}
        onChangeText={e => {
          setUserInfo({...userInfo, password: e});
        }}
      />
      <TouchableOpacity style={styles.button}>
        <Button
          onPress={e => {
            e.persist();
            mutation.mutate(userInfo);
          }}
          title="Login"
          color="navy"
          accessibilityLabel="submit Login"
        />
      </TouchableOpacity>
      <Text
        style={styles.linkStyle}
        onPress={() => navigation.navigate('Register')}>
        Don't have an account yet? Register here
      </Text>
    </View>
  );
};
// const styles = StyleSheet.create({
//   viewStyles: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   inputStyles: {
//     // backgroundColor: 'aqua',
//     borderColor: '#555555',
//     borderWidth: 1,
//     height: 40,
//     width: 300,
//     marginBottom: 25,
//     color: 'black',
//   },
//   labelStyles: {
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   linkStyles: {
//     marginTop: 15,
//     color: 'blue',
//   },
//   button: {
//     marginTop: 5,
//     width: 100,
//   },
// });

export default Login;
