import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import UserContext from '../utils/UserContext';
import {useNavigation} from '@react-navigation/native';
// import KitchensImInContext from '../utils/KitchensImInContext';
import KitchensContext from '../utils/KitchensContext';
import KitchensImInContext from '../utils/KitchensImInContext';

const Logout = () => {
  const {setUser} = useContext(UserContext);
  // const {setKitchensImIn} = useContext(KitchensImInContext);
  const {setMyKitchens} = useContext(KitchensContext);
  const {setKitchensImIn} = useContext(KitchensImInContext);

  const navigation = useNavigation();
  useEffect(() => {
    setUser({});
    setMyKitchens([]);
    setKitchensImIn([]);
    // setKitchen({});
    // setKitchensImIn({});
    navigation.navigate('All Recipes');
    return () => console.log('unmounting logout comp');
  }, []);
  return <View></View>;
};

export default Logout;
