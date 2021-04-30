import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import {SafeAreaView, Text, TouchableOpacity, ScrollView} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import {fetchKitchens, searchForUser, friendToKitchen} from '../utils/API';
import FoundUsers from '../components/FoundUsers';
import KitchensContext from '../utils/KitchensContext';
import UserContext from '../utils/UserContext';
import axios from 'axios';

const SearchUsers = props => {
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState('');

  const {setMyKitchens} = React.useContext(KitchensContext);
  const {user} = React.useContext(UserContext);

  const handleTitleInputChange = e => {
    setFoundUsers([]);
    setSearchValue(e);
  };
  const {info} = props.route.params;

  const {_id, participants, owner} = info;

  useEffect(() => {
    if (searchValue !== '') {
      axios
        .get(`http://10.0.0.50:3001/api/usernames/${searchValue}`)
        .then(res => {
          console.log(res.data);
          setOptions(res.data);
        })
        .catch(err => console.log(err));
      return;
    }
    setOptions([]);

    return () => {};
  }, [searchValue]);

  useEffect(() => {
    if (selection !== '') {
      axios
        .get(`http://10.0.0.50:3001/api/finduserexact/${selection}`)
        .then(res => {
          setFoundUsers([res.data]);
          setOptions([]);
          // console.log(res.data);
        });
    }
    return () => {};
  }, [selection]);

  const addFriendToKitchen = idToAdd => {
    friendToKitchen(idToAdd, _id)
      .then(
        async res =>
          await fetchKitchens(user.id).then(response => {
            const mine = response.data.kitchens.filter(
              m => m.owner === user.id,
            );
            participants.push(res.data);

            setMyKitchens(mine);
          }),
      )
      .catch(err => console.log(err));
  };

  const handleSearchSubmit = () => {
    setSearchValue('');
    searchForUser(searchValue).then(res => setFoundUsers(res.data));
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

        {options &&
          options.length > 0 &&
          options.map(opt => (
            <TouchableOpacity
              onPress={() => setSelection(opt.username)}
              key={opt.username}
              style={styles.foundUsersRow}>
              <Text>{opt.username}</Text>
            </TouchableOpacity>
          ))}

        {foundUsers &&
          foundUsers.map(i => (
            <FoundUsers
              key={i._id}
              i={i}
              participants={participants}
              _id={_id}
              owner={owner}
              userId={user.id}
              addFriendToKitchen={addFriendToKitchen}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchUsers;
