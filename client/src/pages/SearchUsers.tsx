import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import {searchForUser} from '../utils/API';
import UserContext from '../utils/UserContext';
import axios from 'axios';
import KitchensContext from '../utils/KitchensContext';
import {part} from 'core-js/core/function';

const SearchUsers = props => {
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  //   const {user} = useContext(UserContext);
  // const {myKitchens, setMyKitchens} = useContext(KitchensContext);
  const handleTitleInputChange = e => {
    setSearchValue(e);
  };
  const {info} = props.route.params;

  const {_id, participants, owner} = info;
  // console.log(participants);
  useEffect(() => {
    return () => console.log('cleanup searchUser');
  }, []);

  const handleSearchSubmit = e => {
    setSearchValue('');
    searchForUser(searchValue).then(res => setFoundUsers(res.data));
  };
  // console.log(owner);

  const addFriendToKitchen = idToAdd => {
    axios
      .put(`http://192.168.56.1:3001/api/addparticipant/${_id}`, idToAdd)
      .then(res => participants.push(res.data))
      .catch(err => console.log(err));
  };

  const handleAddToKitchen = id => {
    console.log(id === owner);
    if (participants.length > 0) {
      if (participants.filter(i => i._id === id).length > 0 || id === owner) {
        // TODO: alrdy added or it's yourkitchen - do something to tell user
        console.log('alrdy in or your kitchen');
        return;
      }
      console.log('added with ppl alrdy');
      addFriendToKitchen(id);

      return;
    }
    if (!id === owner) console.log('added empty');
    addFriendToKitchen(id);
    return;
  };

  return (
    <SafeAreaView style={styles.flexColContainer}>
      <ScrollView>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchUsers;
