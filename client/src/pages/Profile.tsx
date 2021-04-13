import React, {useContext} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';

const Profile = ({navigation}) => {
  const {user} = useContext(UserContext);
  return (
    <View style={styles.flexColContainer}>
      <Text style={styles.infoText}>
        And then {user.user.username} spoke: Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Nobis tempore labore consectetur maxime?
        Nemo quas laboriosam rerum, numquam quia recusandae?
      </Text>

      {/* <Text
        style={styles.linkStyle}
        onPress={() => navigation.navigate('Search Users')}>
        Search Users
      </Text> */}

      {/* TODO: implement this shit */}
      <Text style={styles.linkStyle}>Edit Profile </Text>
      <Text
        style={styles.linkStyle}
        onPress={() => navigation.navigate('Logout')}>
        Logout
      </Text>
    </View>
  );
};

export default Profile;
