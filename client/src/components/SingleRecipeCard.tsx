import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../utils/styles';

const SingleRecipeCard = ({i}) => {
  const [recipeDisplay, setRecipeDisplay] = React.useState('none');

  const handleRecipePress = () => {
    if (recipeDisplay === 'none') {
      setRecipeDisplay('flex');
      return;
    }
    setRecipeDisplay('none');
    return;
  };

  React.useEffect(() => {
    return () => {};
  }, []);
  return (
    // <View
    <TouchableOpacity onPress={handleRecipePress} style={styles.recipeCard}>
      <View style={styles.recipeInfo}>
        {/* <Text> */}
        <Text
          // onPress={handleRecipePress}
          style={{fontWeight: 'bold', color: '#30363a', fontSize: 16}}>
          {i.title}{' '}
        </Text>
        <Text style={{color: '#30363a', fontSize: 16}}>from {i.author}</Text>

        {/* </Text> */}
      </View>

      <View style={{display: recipeDisplay}}>
        {i.category && (
          <Text style={{color: '#30363a', fontSize: 16}}>
            Category: <Text style={{fontWeight: 'bold'}}>{i.category}</Text>
          </Text>
        )}

        {i.ingredients && i.ingredients.length > 0 && (
          <Text style={{color: '#30363a', marginVertical: 5, fontSize: 16}}>
            Ingredients:{' '}
            {i.ingredients.map((j, ind) => (
              <Text key={j} style={{color: '#30363a', fontSize: 16}}>
                {j}
                {ind !== i.ingredients.length - 1 ? ', ' : ' '}
              </Text>
            ))}
          </Text>
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            marginBottom: 5,
          }}>
          <Text
            style={{
              color: '#30363a',
              fontSize: 18,
              marginVertical: 10,
              marginLeft: 3,
            }}>
            Instructions
          </Text>
          <Text
            style={{
              marginBottom: 5,
              color: '#30363a',
              fontSize: 16,
              marginLeft: 3,
            }}>
            {i.instructions}
          </Text>
        </View>

        {/* {i.ingredients && i.ingredients.length > 0 && (
          <Text style={{color: 'white', marginVertical: 5, fontSize: 16}}>
            Ingredients:{' '}
            {i.ingredients.map((j, ind) => (
              <Text key={j} style={{color: 'white', fontSize: 16}}>
                {j}
                {ind !== i.ingredients.length - 1 ? ', ' : ' '}
              </Text>
            ))}
          </Text>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SingleRecipeCard);
