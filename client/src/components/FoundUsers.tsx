import React from 'react';
// import axios from 'axios';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {styles} from '../utils/styles';

const FoundUsers = props => {
  const [showAddedToast, setShowAddedToast] = React.useState(false);
  const [toastText, setToastText] = React.useState('');

  let alert;

  React.useEffect(() => {
    return () => {
      clearTimeout(alert);
    };
  }, []);

  const showModal = text => {
    setToastText(text);
    setShowAddedToast(true);
    alert = setTimeout(() => {
      setShowAddedToast(false);
      clearTimeout(alert);
    }, 1500);
  };
  const handleAddToKitchen = id => {
    if (props.participants.length > 0) {
      //  the filter prevent duplicate participants
      if (
        props.participants.filter(p => p._id === id).length > 0 ||
        id === props.owner
      ) {
        // TODO: alrdy added or it's yourkitchen - do something to tell user
        showModal("Can't add them again");
        return;
      }
      props.addFriendToKitchen(id);
      showModal('Added');

      return;
    }
    if (id === props.owner) {
      // must be you? and empty kitchen
      showModal("You're already in your kitchen");
      return;
    }
    // added empty
    props.addFriendToKitchen(id);
    showModal('Added');
    return;
  };

  return (
    <View style={styles.userCard}>
      <Text style={{marginTop: 4, fontSize: 18, color: 'white'}}>
        {props.i.username}
      </Text>
      <TouchableOpacity style={styles.button2}>
        <Button
          color="#318ce7"
          title="+"
          onPress={() => handleAddToKitchen(props.i._id)}
        />
      </TouchableOpacity>
      {showAddedToast && (
        <Text
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            color: '#cec9c6',
          }}>
          {toastText && toastText}
        </Text>
      )}
    </View>
  );
};

export default React.memo(FoundUsers);
