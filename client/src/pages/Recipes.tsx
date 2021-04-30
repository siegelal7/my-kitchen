import React, {
  useEffect,
  useContext,
  useState,
  Suspense,
  // Platform,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query';
import CategoryPickers from '../components/CategoryPickers';
import SingleRecipeCard from '../components/SingleRecipeCard';
// const SingleRecipeCard = React.lazy(
//   () => import('../components/SingleRecipeCard'),
// );
// import Input from '../components/Input';
import {getRecipes} from '../utils/API';
import {foodCategories} from '../utils/foodCategories';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
// import CheckBox from '@react-native-community/checkbox';

const Recipes = ({navigation}) => {
  const {user} = useContext(UserContext);
  const [allData, setAllData] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);
  const [renderRecipesStore, setRenderRecipesStore] = useState([]);

  const [dataLength, setDataLength] = useState(
    foodCategories?.length ? foodCategories.length : 0,
  );
  const [categoryFilter, setCategoryFilter] = React.useState([]);

  const {isLoading, status, data, isFetching, isError, error} = useQuery(
    'recipes',
    getRecipes,
  );

  useEffect(() => {
    if (data?.data) {
      const len = data.data.length;
      const limit = len - 15;
      let arr = [];
      for (let m = limit; m < len; m++) {
        // setAllRecipes
        arr.push(data.data[m]);
      }
      setRenderRecipes(arr);
      setRenderRecipesStore(arr);
      // setAllRecipes(data)
      setAllData(data.data);
      // setAllRecipes(data.data);
    }
    // const max = foodCategories.length;
    // if (max) {
    //   setMax(max);
    // }
    // console.log(max);
    return () => {};
  }, [data?.data]);

  useEffect(() => {
    // setRecipesToMap()
    if (categoryFilter.length === 0) {
      setRenderRecipes(renderRecipesStore);
    } else {
      const matches = allData.filter(item =>
        categoryFilter.includes(item.category),
      );

      setRenderRecipes(matches);
    }

    return () => {};
  }, [categoryFilter]);

  // const handleCategoryClick = (backgroundColor, setBackgroundColor, i) => {
  //   if (backgroundColor === '#2f4f4f') {
  //     // console.log(`added ${i.category}`);
  //     setBackgroundColor('#cc6666');
  //     setCategoryFilter(categoryFilter => [...categoryFilter, i.category]);
  //     return;
  //   }
  //   // console.log(`removed ${i.category}`);
  //   const filteredCategories = categoryFilter.filter(cat => cat !== i.category);
  //   setBackgroundColor('#2f4f4f');
  //   setCategoryFilter(filteredCategories);
  // };

  if (isLoading) {
    return (
      <View style={styles.flexColContainer}>
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.flexColContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (data.data.length === 0) {
    return (
      <View style={styles.flexColContainer}>
        <Text style={{color: 'white', fontSize: 24}}>Add some recipes!</Text>
        {user.username && (
          <Text
            style={styles.bottomLink}
            onPress={() => {
              navigation.navigate('New Recipe', {
                recipes: null,
                kitchen: null,
              });
            }}>
            Add a Recipe
          </Text>
        )}
      </View>
    );
  }

  // if (categoryFilter.length !== 0){
  //   const
  // }

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginVertical: 20,
          height: dataLength * 10 + 5,
          // width: 500,
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          // backgroundColor: '#cec9c6',
          justifyContent: 'space-around',
          // color: 'black',
          // textAlign: 'center',
          // alignItems: 'center',
        }}>
        {foodCategories.map(i => (
          <CategoryPickers
            key={i.category}
            i={i}
            dataLength={dataLength}
            // setRenderRecipes={setRenderRecipes}
            // handleCategoryClick={handleCategoryClick}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        ))}
      </View>
      {/* TODO: only map thru certain number? */}
      <View style={{flex: 1, alignItems: 'center', marginBottom: 35}}>
        {renderRecipes.map(i => (
          <SingleRecipeCard key={i._id} i={i} />
        ))}
        {user.username && (
          <Text
            style={styles.bottomLink}
            onPress={() => {
              navigation.navigate('New Recipe', {
                recipes: null,
                kitchen: null,
              });
            }}>
            Add a Recipe
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Recipes;
