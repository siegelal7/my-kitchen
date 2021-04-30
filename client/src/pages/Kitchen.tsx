import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import KitchensContext from '../utils/KitchensContext';
// import {useMutation} from 'react-query';
import axios from 'axios';
import UserContext from '../utils/UserContext';
import GroceryList from '../components/GroceryList';
import Participants from '../components/Participants';
import {ScrollView} from 'react-native-gesture-handler';
import KitchensImInContext from '../utils/KitchensImInContext';
import SingleRecipeCard from '../components/SingleRecipeCard';

const Kitchen = props => {
  const [newItem, setNewItem] = useState('');
  // const [results, setResults] = useState([]);

  const {myKitchens, setMyKitchens} = useContext(KitchensContext);
  const {info} = props.route.params;
  const {user} = useContext(UserContext);
  const {setKitchensImIn} = useContext(KitchensImInContext);

  const {groceryList, name, _id, participants, owner, recipes} = info;
  // console.log(participants);

  const [groceryListItems, setGroceryListItems] = useState(
    groceryList ? groceryList : [],
  );

  useEffect(() => {
    return () => {};
  }, []);

  // const handleRecipeAddToKitchen = i => {
  //   axios
  //     .put(`http://192.168.56.1:3001/api/kitchen/addrecipe/${_id}`, i._id)
  //     .then(res => {});
  // };

  const handleDeleteKitchen = () => {
    axios.delete(`http://10.0.0.50:3001/api/kitchen/${info._id}`).then(res => {
      const without = myKitchens.filter(i => res.data.kitchens.includes(i._id));

      setMyKitchens(without);
      props.navigation.navigate('Manage Kitchens');
    });
  };

  const handleGroceryItemAdd = item => {
    if (_id && !groceryListItems.includes(item) && newItem != '') {
      if (owner === user.id) {
        axios
          .put(`http://10.0.0.50:3001/api/additem/${_id}`, newItem)
          .then(({data}) => {
            setNewItem('');
            const mine = data.kitchens.filter(i => i.owner === user.id);
            const newList = data.kitchens.filter(i => i.name === name);

            setGroceryListItems(newList[0].groceryList);
            setMyKitchens(mine);
          })
          .catch(err => console.log(err));
      } else {
        const payload = {
          user: user.id,
          newItem,
        };
        axios
          .put(`http://10.0.0.50:3001/api/additemparticipant/${_id}`, payload)
          .then(res => {
            setNewItem('');
            const imIn = res.data.kitchens.filter(j => j.owner !== user.id);
            const newList = res.data.kitchens.filter(i => i.name === name);
            setGroceryListItems(newList[0].groceryList);
            setKitchensImIn(imIn);
          });
      }
      return;
    }
    //   // TODO: tell user alrdy added or whatever
  };

  return (
    <SafeAreaView style={{backgroundColor: '#30363a'}}>
      <ScrollView
        //   // contentContainerStyle={{flexGrow: 1}}
        style={styles.scrollScreen}>
        <View style={styles.flexColContainer}>
          {owner === user.id && (
            <TouchableOpacity style={styles.buttonTop}>
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
            <Text style={styles.noGroceryItemsText}>
              Grocery list goes here!
            </Text>
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

          {/*<View>
             <Input
          // label="Dish Name"
          value={searchValue}
          onChangeText={handleInputChange}
          inputStyles={styles.searchInput}
          viewStyles={styles.viewStyles}
          // placeHolder="title"
          onSubmitEditing={handleSearchSubmit}
        /> 
             {results &&
              results.map(i => (
                <Text onPress={() => handleRecipeAddToKitchen(i)} key={i._id}>
                  {i.title}
                </Text>
              ))} 
          </View>*/}
          <View style={{flex: 1, alignItems: 'center'}}>
            {recipes.map(i => (
              <SingleRecipeCard key={i._id} i={i} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Kitchen;
