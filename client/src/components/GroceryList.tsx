import React from 'react';
import {Text} from 'react-native';
import {styles} from '../utils/styles';

const GroceryList = ({n, i}) => {
  return (
    <Text style={styles.groceryItem}>
      {n + 1}: {i}
    </Text>
  );
};

export default React.memo(GroceryList);
