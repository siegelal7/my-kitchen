import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {styles} from '../utils/styles';

const GroceryList = ({n, i}) => {
  return (
    <Text style={styles.groceryItem} key={i}>
      {n + 1}: {i}
    </Text>
  );
};

export default GroceryList;
