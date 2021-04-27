import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';

const CategoryPickers = ({
  dataLength,
  i,
  // setRenderRecipes,
  categoryFilter,
  setCategoryFilter,
}) => {
  const [backgroundColor, setBackgroundColor] = React.useState('#2f4f4f');
  // const [categoryFilter, setCategoryFilter] = React.useState([]);

  const handleCategoryClick = () => {
    if (backgroundColor === '#2f4f4f') {
      // console.log(`added ${i.category}`);
      setBackgroundColor('#cc6666');

      // setCategoryFilter(i.category);
      setCategoryFilter(categoryFilter => [...categoryFilter, i.category]);
      return;
    }
    // console.log(`removed ${i.category}`);
    const filteredCategories = categoryFilter.filter(cat => cat !== i.category);
    setBackgroundColor('#2f4f4f');
    setCategoryFilter(filteredCategories);
    // setCategoryFilter('');
    return;
  };

  React.useEffect(() => {
    // console.log(categoryFilter);
    // handleChangeFromChild(categoryFilter, i.category);
    return () => {};
  }, [categoryFilter]);

  return (
    <TouchableOpacity
      key={i.category}
      style={{
        backgroundColor: backgroundColor,
        height: 30,
        paddingVertical: 2,
        width: Dimensions.get('window').width / dataLength + dataLength * 5,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}
      onPress={() => handleCategoryClick()}>
      <Text style={{color: '#cec9c6', fontSize: 15}}>
        {i.category}
        {/* {index != dataLength ? ', ' : ''} */}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryPickers);
