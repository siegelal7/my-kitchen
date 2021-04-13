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

  const handleAddToKitchen = id => {
    let kitchen = myKitchens[0];

    if (kitchen && kitchen.participants && kitchen.participants.length === 0) {
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
        //   TODO:alrdy added to kitchen prolly should have a message
        console.log('does');
      } else {
        // console.log(id);
        axios
          .put(`http://192.168.56.1:3001/api/addparticipant/${kitchen._id}`, id)
          .then(res => {
            setMyKitchens([res.data]);
            // console.log(res.data);
            return;
          })
          .catch(err => console.log(err));
      }

      return;
    }
  };

  return (
    <View style={styles.flexColContainer}>
      <Input
        // label="Dish Name"
        value={searchValue}
        onChangeText={handleTitleInputChange}
        inputStyles={styles.searchInput}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSearchSubmit}
      />
      {foundUsers &&
        foundUsers.map(i => (
          <View key={i._id} style={styles.userCard}>
            <Text
              style={{marginTop: 4, fontSize: 18, color: 'white'}}
              key={i._id}>
              {i.username}
            </Text>
            <TouchableOpacity style={styles.button2}>
              <Button
                color="#318ce7"
                title="+"
                onPress={() => handleAddToKitchen(i._id)}
              />
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

export default SearchUsers;
