import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis tempore
        labore consectetur maxime? Nemo quas laboriosam rerum, numquam quia
        recusandae?
      </Text>
      <TouchableOpacity style={styles.button}>
        <Button title="logout" onPress={() => navigation.navigate('Logout')} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  infoText: {
    paddingHorizontal: 3,
  },
  button: {marginTop: 20, width: 100},
});

export default Profile;
