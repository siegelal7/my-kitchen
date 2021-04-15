import React from 'react';
import {View, Text, Button} from 'react-native';
import {styles} from '../utils/styles';
// import UserContext from '../utils/UserContext.js';
import AddPeopleOrRecipes from './AddPeopleOrRecipes';

const Participants = ({
  participants,
  owner,
  navigation,
  user,
  groceryList,
  name,
  recipes,
  _id,
}) => {
  //   const {user} = React.useContext(UserContext);
  React.useEffect(() => {
    return () => console.log('cleanup participants');
  }, []);
  return (
    <View style={{marginTop: 40}}>
      <Text style={styles.header}>Kitchen-mates</Text>
      {/* {owner === user.id && (
        <AddPeopleOrRecipes
          participants={participants}
          name={name}
          owner={owner}
          _id={_id}
          user={user}
          groceryList={groceryList}
        />
      )} */}

      {participants &&
        participants.length > 0 &&
        participants.map(person => (
          <Text key={person._id} style={styles.kitchenParticipants}>
            {/* {index + 1 + ': '} */}
            {person.username}
          </Text>
        ))}
      {owner === user.id && (
        <AddPeopleOrRecipes
          participants={participants}
          name={name}
          owner={owner}
          recipes={recipes}
          navigation={navigation}
          _id={_id}
          user={user}
          groceryList={groceryList}
        />
      )}
    </View>
  );
};

export default Participants;
