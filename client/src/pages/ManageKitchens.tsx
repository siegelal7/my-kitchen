import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import KitchensContext from '../utils/KitchensContext';
import {styles} from '../utils/styles';
const ManageKitchens = ({navigation}) => {
  const {myKitchens} = useContext(KitchensContext);
  console.log(myKitchens);
  return (
    // <View style={styles.flexColContainer}>
    <View style={styles.container}>
      {myKitchens && myKitchens.map(i => <Text key={i._id}>{i.name}</Text>)}
      {/* <Text>hi</Text> */}
    </View>
  );
};

export default ManageKitchens;
