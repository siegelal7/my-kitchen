import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../utils/styles';

const SingleRecipeCard = ({
  // max,
  // index,
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
  React.useEffect(() => {
    return () => console.log('unmounting singlerecipecard component');
  }, []);
  return (
    <View
      key={i._id}
      // style={max - 1 == index ? styles.recipeCardBtm : styles.recipeCard}>
      style={styles.recipeCard}>
      <View style={styles.recipeInfo}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
          {i.title}{' '}
        </Text>
        <Text style={{color: 'white', fontSize: 16}}>from {i.author}</Text>
      </View>
      <Text style={{marginBottom: 5, color: 'white'}}>{i.instructions}</Text>
      {i.ingredients && i.ingredients.length > 0 && (
        <Text
          style={{color: 'white', fontSize: 16}}
          onPress={handleIngredPress}>
          {ingredDisplay === 'none' ? 'Show' : 'Hide'} Ingredients
        </Text>
      )}
      <Text style={{display: ingredDisplay, marginVertical: 5}}>
        {i.ingredients.map((j, ind) => (
          <Text key={j} style={{color: 'white', fontSize: 16}}>
            {j}
            {ind !== i.ingredients.length - 1 ? ', ' : ' '}
          </Text>
        ))}
      </Text>
    </View>
  );
};

export default SingleRecipeCard;
