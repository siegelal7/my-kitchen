import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import KitchensContext from '../utils/KitchensContext';
import {useMutation} from 'react-query';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import GroceryList from '../components/GroceryList';
import Participants from '../components/Participants';
import {ScrollView} from 'react-native-gesture-handler';
import KitchensImInContext from '../utils/KitchensImInContext';

const Kitchen = props => {
  const [newItem, setNewItem] = useState('');
  // const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  const {myKitchens, setMyKitchens} = useContext(KitchensContext);
  const {info} = props.route.params;
  const {user} = useContext(UserContext);
  const {setKitchensImIn} = useContext(KitchensImInContext);

  const {groceryList, name, _id, participants, owner, recipes} = info;
  // console.log(participants);

  const [groceryListItems, setGroceryListItems] = useState(
    groceryList ? groceryList : [],
  );

  // const mutation = useMutation()

  useEffect(() => {
    return () => console.log('cleanup kitchen');
  }, []);

  // const handleInputChange = e => {
  //   setSearchValue(e);
  // };
  // const handleSearchSubmit = () => {
  //   axios
  //     .get(`http://192.168.56.1:3001/api/recipes/${searchValue}`)
  //     .then(res => setResults(res.data))
  //     .catch(err => console.log(err));
  // };

  const handleRecipeAddToKitchen = i => {
    axios
      .put(`http://192.168.56.1:3001/api/kitchen/addrecipe/${_id}`, i._id)
      .then(res => console.log(res.data));
  };

  const handleDeleteKitchen = () => {
    axios
      .delete(`http://192.168.56.1:3001/api/kitchen/${info._id}`)
      .then(res => {
        const without = myKitchens.filter(i =>
          res.data.kitchens.includes(i._id),
        );

        setMyKitchens(without);
        props.navigation.navigate('Manage Kitchens');
      });
  };

  const handleGroceryItemAdd = item => {
    if (_id && !groceryListItems.includes(item) && newItem != '') {
      axios
        .put(`http://192.168.56.1:3001/api/additem/${_id}`, newItem)
        .then(res => {
          setNewItem('');
          if (owner === user.id) {
            setMyKitchens(res.data.kitchens);
          } else {
            // console.log(res.data);
            setKitchensImIn(res.data.kitchens);
          }

          const newList = res.data.kitchens.filter(i => i.name === name);
          //   console.log(newList);
          setGroceryListItems(newList[0].groceryList);
        })
        .catch(err => console.log(err));
      return;
    }
    const re = new RegExp(item, 'i');
    // console.log(re);
    // TODO: tell user alrdy added or whatever
    console.log('alrdy added that item');
  };
  // console.log(myKitchens);
  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={styles.flexColContainer}>
        {owner === user.id && (
          <TouchableOpacity style={{}}>
            <Button
              color="#FF033f"
              onPress={handleDeleteKitchen}
              title="Delete Kitchen"
            />
          </TouchableOpacity>
        )}

        <Text style={styles.header}>
          {name}
          {/* her */}
        </Text>
        {/* <Text> */}
        {groceryListItems.length !== 0 ? (
          groceryListItems.map((i, n) => <GroceryList key={n} i={i} n={n} />)
        ) : (
          <Text style={styles.noGroceryItemsText}>Grocery list goes here!</Text>
        )}
        <Input
          placeholder="Add an item"
          inputStyles={styles.inputStyles}
          onChangeText={e => setNewItem(e)}
          value={newItem}
          onSubmitEditing={() => handleGroceryItemAdd(newItem)}
        />
        <Participants
          participants={participants}
          groceryList={groceryList}
          name={name}
          recipes={recipes}
          navigation={props.navigation}
          user={user}
          owner={owner}
          _id={_id}
        />

        <View>
          {/* <Input
          // label="Dish Name"
          value={searchValue}
          onChangeText={handleInputChange}
          inputStyles={styles.searchInput}
          viewStyles={styles.viewStyles}
          // placeHolder="title"
          onSubmitEditing={handleSearchSubmit}
        /> */}
          {results &&
            results.map(i => (
              <Text onPress={() => handleRecipeAddToKitchen(i)} key={i._id}>
                {i.title}
              </Text>
            ))}
        </View>
        <View style={{paddingBottom: 200}}>
          {recipes.map(i => (
            <View style={styles.recipeCard} key={i._id}>
              <Text style={{color: 'white'}}>{i.title}</Text>
              <Text style={{color: 'white'}}>{i.instructions} yoyo</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Kitchen;
