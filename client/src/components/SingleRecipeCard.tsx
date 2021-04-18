import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../utils/styles';

const SingleRecipeCard = ({i}) => {
  const [recipeDisplay, setRecipeDisplay] = React.useState('none');

  const handleRecipePress = () => {
    // console.log('que');
    if (recipeDisplay === 'none') {
      setRecipeDisplay('flex');
      return;
    }
    setRecipeDisplay('none');
    return;
  };

  React.useEffect(() => {
    return () => console.log('unmounting singlerecipecard component');
  }, []);
  return (
    // <View
    <TouchableOpacity
      onPress={handleRecipePress}
      key={i._id}
      style={styles.recipeCard}>
      <View style={styles.recipeInfo}>
        {/* <Text> */}
        <Text
          // onPress={handleRecipePress}
          style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
          {i.title}{' '}
        </Text>
        <Text style={{color: 'white', fontSize: 16}}>from {i.author}</Text>
        {/* </Text> */}
      </View>
      <View style={{display: recipeDisplay}}>
        <Text style={{marginBottom: 5, color: 'white', fontSize: 16}}>
          {i.instructions}
        </Text>

        {i.ingredients && i.ingredients.length > 0 && (
          <Text style={{color: 'white', marginVertical: 5, fontSize: 16}}>
            Ingredients:{' '}
            {i.ingredients.map((j, ind) => (
              <Text key={j} style={{color: 'white', fontSize: 16}}>
                {j}
                {ind !== i.ingredients.length - 1 ? ', ' : ' '}
              </Text>
            ))}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SingleRecipeCard;
