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

  // const pushToParticipants = (person, kitchens) => {
  //   participants.push(person);
  //   // console.log(kitchens);
  //   setMyKitchens(kitchens);
  // };
  // const unmount = () => {
  //   axios.get(`http://192.168.56.1:3001/api/user/${user.id}`).then(response => {
  //     const mine = response.data.kitchens.filter(m => m.owner === user.id);
  //     participants.push(res.data);
  //     setMineTemp(mine);

  //     // pushToParticipants(response.data, mine);
  //   });
  // };

  const addFriendToKitchen = idToAdd => {
    friendToKitchen(idToAdd)
      .then(
        async res =>
          // const testing = res.data.kitchens.map(j => j.owner);
          // const blah = [];
          // await testing.forEach(p => p == props.userId && blah.push(p));
          // console.log(blah);
          // console.log(res.data.kitchens);
          await fetchKitchens(user.id).then(response => {
            const mine = response.data.kitchens.filter(
              m => m.owner === user.id,
            );
            participants.push(res.data);

            setMyKitchens(mine);
          }),
        // axios
        //   .get(`http://192.168.56.1:3001/api/user/${user.id}`)
        //   .then(response => {
        //     const mine = response.data.kitchens.filter(
        //       m => m.owner === user.id,
        //     );
        //     participants.push(res.data);
        //     // console.log(mine);
        //     setMyKitchens(mine);
        //     // setMineTemp(mine);

        //     // pushToParticipants(response.data, mine);
        //   }),

        // await props.participants.push(res.data, mine);
      )
      .catch(err => console.log(err));
  };

  useEffect(() => {
    return () => {
      // unmount();
      // setMyKitchens(mineTemp);
    };
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
              key={i._id}
              participants={participants}
              _id={_id}
              owner={owner}
              // pushToParticipants={pushToParticipants}
              userId={user.id}
              addFriendToKitchen={addFriendToKitchen}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchUsers;
