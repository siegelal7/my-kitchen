import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import UserContext from '../utils/UserContext';
import {useNavigation} from '@react-navigation/native';

const Logout = () => {
  const {setUser} = useContext(UserContext);
  const navigation = useNavigation();
  useEffect(() => {
    setUser({});
    return navigation.navigate('All Recipes');
  }, []);
  return <View></View>;
};

export default Logout;
