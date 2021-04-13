import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import KitchensContext from '../utils/KitchensContext';
import {styles} from '../utils/styles';

const ManageKitchens = ({navigation}) => {
  const {myKitchens} = useContext(KitchensContext);

  const handleKitchenClick = name => {
    const match = myKitchens.filter(i => i.name === name)[0];

    navigation.navigate('Grocery List', {
      info: match,
    });
  };

  return (
    <View style={styles.flexColContainer}>
      {myKitchens.length > 0 && (
        <Text style={styles.header}>Your Kitchens</Text>
      )}

      {myKitchens &&
        myKitchens.map(i => (
          <Text
            key={i._id}
            value={i.name}
            style={styles.linkStyle}
            onPress={() => handleKitchenClick(i.name)}>
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
    </View>
  );
};

export default ManageKitchens;
