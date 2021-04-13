import React, {useContext} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import KitchensContext from '../utils/KitchensContext';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
import KitchensImInContext from '../utils/KitchensImInContext';

const ManageKitchens = ({navigation}) => {
  const {myKitchens} = useContext(KitchensContext);
  const {user} = useContext(UserContext);
  const {kitchensImIn} = useContext(KitchensImInContext);
  // console.log(kitchensImIn);

  const handleMyKitchenClick = name => {
    const match = myKitchens.filter(i => i.name === name)[0];
    navigation.navigate('Grocery List', {
      info: match,
    });
  };

  const handleKitchenImInClick = name => {
    const match = kitchensImIn.filter(i => i.name === name)[0];
    navigation.navigate('Grocery List', {
      info: match,
    });
  };

  return (
    <SafeAreaView style={styles.flexColContainer}>
      {myKitchens.length > 0 && (
        <Text style={styles.header}>Your Kitchens</Text>
      )}

      {myKitchens &&
        myKitchens.map(i => (
          <Text
            key={i._id}
            value={i.name}
            style={styles.linkStyle}
            onPress={() => handleMyKitchenClick(i.name)}>
            {i.name}
          </Text>
        ))}
      <View style={{marginTop: 40}}>
        <Text
          style={styles.linkStyle}
          onPress={() => navigation.navigate('Create a Kitchen')}>
          {myKitchens.length > 0
            ? 'Create another Kitchen'
            : 'Create your own Kitchen'}
        </Text>
      </View>
      <View style={styles.blockFlexColContainer}>
        <Text style={styles.header}>Kitchens you're in</Text>
        {kitchensImIn &&
          kitchensImIn.map(j => (
            <Text
              key={j._id}
              // value={j.name}
              style={styles.linkStyle}
              onPress={() => handleKitchenImInClick(j.name)}>
              {j.name}
            </Text>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default ManageKitchens;
