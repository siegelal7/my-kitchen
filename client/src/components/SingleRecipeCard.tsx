import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utils/styles';

const SingleRecipeCard = ({
  max,
  index,
  //   ingredDisplay,
  //   setIngredDisplay,
  i,
  //   handleIngredPress,
}) => {
  const [ingredDisplay, setIngredDisplay] = React.useState('none');
  const handleIngredPress = () => {
    if (ingredDisplay === 'none') {
      setIngredDisplay('flex');
      return;
    }
    setIngredDisplay('none');
    return;
  };
  return (
    <View
      key={i._id}
      style={max - 1 == index ? styles.recipeCardBtm : styles.recipeCard}>
      <View style={styles.recipeInfo}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>{i.title} </Text>
        <Text style={{color: 'white'}}>from {i.author}</Text>
      </View>
      <Text style={{color: 'white'}} onPress={handleIngredPress}>
        {ingredDisplay === 'none' ? 'Show' : 'Hide'} Ingredients
      </Text>
      {i.ingredients.map(j => (
        <Text key={j} style={{color: 'white', display: ingredDisplay}}>
          {j}
        </Text>
      ))}
      <Text style={{marginBottom: 5, color: 'white'}}>{i.instructions}</Text>
    </View>
  );
};

export default SingleRecipeCard;
