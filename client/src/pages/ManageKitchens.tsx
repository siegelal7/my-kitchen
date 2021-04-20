import React, {useContext, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import KitchensContext from '../utils/KitchensContext';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
import KitchensImInContext from '../utils/KitchensImInContext';
import {fetchKitchens} from '../utils/API';

const ManageKitchens = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const {myKitchens, setMyKitchens} = useContext(KitchensContext);
  const {user} = useContext(UserContext);
  const {kitchensImIn, setKitchensImIn} = useContext(KitchensImInContext);

  useEffect(() => {
    setLoading(true);
    fetchKitchens(user.id)
      .then(res => {
        const imIn = res.data.kitchens.filter(j => j.owner !== user.id);
        const mine = res.data.kitchens.filter(i => i.owner === user.id);
        setKitchensImIn(imIn);
        setMyKitchens(mine);
        setLoading(false);
      })
      .catch(err => console.log(err));
    return () => {};
  }, []);

  const handleMyKitchenClick = name => {
    const match = myKitchens.filter(i => i.name === name)[0];
    // console.log(match);
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

  if (loading) {
    return (
      <View style={styles.flexColContainer}>
        <Text style={{color: 'white', fontSize: 18, marginTop: 20}}>
          Loading
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.flexColContainer}>
      {myKitchens && myKitchens.length > 0 && (
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
