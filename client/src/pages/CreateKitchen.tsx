import React, {useContext, useState} from 'react';
import axios from 'axios';
import {View} from 'react-native';
import Input from '../components/Input';
import {styles} from '../utils/styles';
import UserContext from '../utils/UserContext';
import KitchensContext from '../utils/KitchensContext';
import KitchensImInContext from '../utils/KitchensImInContext';

const CreateKitchen = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const {setMyKitchens} = useContext(KitchensContext);
  const {setKitchensImIn} = useContext(KitchensImInContext);

  const [kitchen, setKitchen] = useState({
    name: '',
    owner: user && user.id,
    participants: [],
  });

  React.useEffect(() => {
    return () => console.log('cleanup CreateKitchen');
  }, []);

  const handleNameInputChange = e => {
    setKitchen({...kitchen, name: e});
  };

  const handleKitchenSubmit = () => {
    console.log('woah i added a kitchen');
    // FIXME: holy shit what was I  thinking?
    // TODO: fix this shit
    axios
      .post('http://10.0.0.112:3001/api/kitchen', kitchen)
      .then(async res => {
        setUser({...user, kitchens: res.data.kitchens});
        // const imIn = await res.data.kitchens.filter(j => j.owner !== user.id);
        const mine = await res.data.kitchens.filter(i => i.owner === user.id);
        // setKitchensImIn(imIn);
        setMyKitchens(mine);
        navigation.navigate('Manage Kitchens');
        // setUser({
        //   ...user,
        //   kitchens: res.data.kitchens,
        // });
        //     axios
        //       .get(`http://192.168.56.1:3001/api/user/${user.id}`)
        //       .then(async now => {
        //         // console.log(now.data);
        //         // console.log(now.data.kitchens);
        //         const imIn = await now.data.kitchens.filter(
        //           j => j.owner !== user.id,
        //         );
        //         const mine = await now.data.kitchens.filter(
        //           i => i.owner === user.id,
        //         );
        //         setKitchensImIn(imIn);
        //         setMyKitchens(mine);
        //         // setMyKitchens(now.data.kitchens);
        //       })
        //       .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
    //   .catch(err => console.log(err));
    // navigation.navigate('Manage Kitchens');
  };
  return (
    <View style={styles.container}>
      <Input
        label="Kitchen Name"
        value={kitchen.name}
        onChangeText={handleNameInputChange}
        inputStyles={styles.inputStyles}
        viewStyles={styles.viewStyles}
        // placeHolder="title"
        onSubmitEditing={handleKitchenSubmit}
      />
    </View>
  );
};

export default CreateKitchen;
