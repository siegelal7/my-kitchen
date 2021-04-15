import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utils/styles';

const KitchenHostPage = ({navigation}) => {
  return (
    <View style={styles.flexColContainer}>
      <Text style={styles.linkStyle}>Grocery List</Text>
      <Text style={styles.linkStyle}>Kitchen Mates</Text>
      <Text style={styles.linkStyle}>Manage Menu</Text>
    </View>
  );
};

export default KitchenHostPage;
