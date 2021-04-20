import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SafeAreaView, ScrollView} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import {fetchKitchens, searchForUser, friendToKitchen} from '../utils/API';
import FoundUsers from '../components/FoundUsers';
import KitchensContext from '../utils/KitchensContext';
import UserContext from '../utils/UserContext';

const SearchUsers = props => {
  const [searchValue, setSearchValue] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const {setMyKitchens} = React.useContext(KitchensContext);
  const {user} = React.useContext(UserContext);

  const handleTitleInputChange = e => {
    setSearchValue(e);
  };
  const {info} = props.route.params;

  const {_id, participants, owner} = info;

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

  useEffect(() => {
    return () => {};
  }, []);

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
        {foundUsers &&
          foundUsers.map(i => (
            <FoundUsers
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
