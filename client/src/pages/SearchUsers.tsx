import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import {searchForUser} from '../utils/API';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import KitchensContext from '../utils/KitchensContext';

const SearchUsers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  //   const {user} = useContext(UserContext);
  const {myKitchens, setMyKitchens} = useContext(KitchensContext);
  const handleTitleInputChange = e => {
    setSearchValue(e);
  };

  const handleSearchSubmit = e => {
    setSearchValue('');
    searchForUser(searchValue).then(res => setFoundUsers(res.data));
  };

  //   useEffect(() => {
  //     // console.log(myKitchens);

  //     axios
  //       .get(`http://192.168.56.1:3001/api/user/${user.user.id}`)
  //       .then(res => setMyKitchens(res.data.kitchens))
  //       .catch(err => console.log(err));

  //     return () => {};
  //   }, []);

  //   console.log('b4');
  console.log(myKitchens);
  const handleAddToKitchen = id => {
    console.log('b4');
    console.log(myKitchens);
    // console.log(id);
    let kitchen = myKitchens[0];
    // console.log(myKitchens);
    if (kitchen && kitchen.participants && kitchen.participants.length === 0) {
      console.log('here');
      axios
        .put(`http://192.168.56.1:3001/api/addparticipant/${kitchen._id}`, id)
        .then(res => {
          setMyKitchens([res.data]);
          //   setMyKitchens(myKitchens => [...myKitchens, res.data]);
          console.log(res.data);
          return;
        })
        .catch(err => console.log(err));
      return;
    }
    if (kitchen && kitchen.participants && kitchen.participants.length > 0) {
      if (kitchen.participants.includes(id)) {
        //   TODO:alrdy added
        console.log('does');
      } else {
        // console.log(id);
        axios
          .put(`http://192.168.56.1:3001/api/addparticipant/${kitchen._id}`, id)
          .then(res => {
            setMyKitchens([res.data]);
            //   setMyKitchens(myKitchens => [...myKitchens, res.data]);
            console.log(res.data);
            return;
          })
          .catch(err => console.log(err));
      }
      console.log('not there');
      console.log(myKitchens);
      return;
    }
    // if (user.user.kitchens.length === 2) {
    //   console.log('2');
    //   return;
    // }
    // console.log('nope');
  };
  return (
    <View style={styles.flexColContainer}>
      <Input
        // label="Dish Name"
        value={searchValue}
        onChangeText={handleTitleInputChange}
        inputStyles={styles.inputStyles}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSearchSubmit}
      />
      {foundUsers &&
        foundUsers.map(i => (
          <View key={i._id} style={styles.userCard}>
            <Text style={{marginTop: 4, fontSize: 18}} key={i._id}>
              {i.username}
            </Text>
            <TouchableOpacity style={styles.button2}>
              <Button title="+" onPress={() => handleAddToKitchen(i._id)} />
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

export default SearchUsers;
