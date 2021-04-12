import React, {useContext, useState} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
import KitchensContext from '../utils/KitchensContext';

const CreateKitchen = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const {myKitchens, setMyKitchens} = useContext(KitchensContext);

  const [kitchen, setKitchen] = useState({
    name: '',
    owner: user && user.user && user.user.id,
    participants: [],
  });
  const handleNameInputChange = e => {
    setKitchen({...kitchen, name: e});
  };
  const handleSubmit = () => {
    // console.log(kitchen);
    axios
      .post('http://192.168.56.1:3001/api/kitchen', kitchen)
      .then(res => {
        console.log(res.data.kitchens);
        // setMyKitchens(res.data.kitchens);
        setUser({...user, kitchens: res.data.kitchens});
        axios
          .get(`http://192.168.56.1:3001/api/user/${user.user.id}`)
          .then(now => {
            // console.log(now.data);
            // console.log(now.data.kitchens);
            setMyKitchens(now.data.kitchens);
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
    navigation.navigate('Manage Kitchens');
  };
  return (
    <View>
      <Input
        label="Kitchen Name"
        value={kitchen.name}
        onChangeText={handleNameInputChange}
        inputStyles={styles.inputStyles}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

export default CreateKitchen;
