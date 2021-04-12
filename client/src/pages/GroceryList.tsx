import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import KitchensContext from '../utils/KitchensContext';
import {useMutation} from 'react-query';
import axios from 'axios';

const GroceryList = props => {
  const [newItem, setNewItem] = useState('');
  const {myKitchens, setMyKitchens} = useContext(KitchensContext);
  //   const {name, list, kitchenId} = props.route.params;
  const {info} = props.route.params;
  const {groceryList, name, _id, participants} = info;
  //   console.log(participants);
  //   useEffect(() => {
  //     for (let i = 0; i < participants.length; i++) {
  //       console.log(participants[i].username);
  //     }
  //   }, []);
  //   console.log(list);
  const [groceryListItems, setGroceryListItems] = useState(
    groceryList ? groceryList : [],
  );
  //   console.log(myKitchens);

  const handleGroceryItemAdd = item => {
    // console.log(item);
    // console.log(list.includes(item));
    if (_id && !groceryList.includes(item)) {
      axios
        .put(`http://192.168.56.1:3001/api/additem/${_id}`, newItem)
        .then(res => {
          setNewItem('');
          setMyKitchens(res.data.kitchens);
          //   list.append(newItem);
          // setMyKitchens({...myKitchens, myKitchens[0]: res.data});
          //   setGroceryListItems(res.data.kitchens[0]);
          const newList = res.data.kitchens.filter(i => i.name === name);
          //   console.log(newList);
          setGroceryListItems(newList[0].groceryList);
        })
        .catch(err => console.log(err));
      return;
    }
    console.log('alrdy added that item');
  };

  return (
    <View style={styles.flexColContainer}>
      <Button
        color="#FF0000"
        onPress={() => {
          axios
            .delete(`http://192.168.56.1:3001/api/kitchen/${kitchenId}`)
            .then(res => {
              const without = groceryListItems.filter(
                i => i._id !== res.data._id,
              );
              //   console.log(res.data);
              setMyKitchens(without);
              props.navigation.navigate('Manage Kitchens');
            });
        }}
        title="Delete Kitchen"></Button>
      <Text style={styles.header}>
        Kitchen: {name}
        {/* her */}
      </Text>
      {/* <Text> */}
      {groceryListItems.length !== 0 ? (
        groceryListItems.map((i, n) => (
          <Text style={{marginTop: 5}} key={i}>
            {n + 1}: {i}
          </Text>
        ))
      ) : (
        <Text>Don't starve yourself!</Text>
      )}
      <Input
        placeholder="Add an item"
        inputStyles={styles.inputStyles}
        onChangeText={e => setNewItem(e)}
        value={newItem}
        onSubmitEditing={() => handleGroceryItemAdd(newItem)}
      />
      {/* participants list */}
      <View style={{marginTop: 40}}>
        <Text style={styles.header}>Kitchen-mates</Text>
        {participants &&
          participants.length > 0 &&
          participants.map(person => (
            <Text key={person._id}>{person.username}</Text>
          ))}
      </View>
      {/* his */}
      {/* </Text> */}
    </View>
  );
};

export default GroceryList;
