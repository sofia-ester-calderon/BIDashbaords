import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import * as Navigation from './RootNavigation';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const NavBar = () => {
  const [userPermissions] = useUserPermissions();

  const handleOnPress = () => {
    if (userPermissions.loggedIn) {
      Navigation.toggleDrawer();
    } else {
      Alert.alert('Message', 'Please Log in First!', [{text: 'OK'}], {
        cancelable: true,
      });
    }
  };

  return (
    <View style={{backgroundColor: '#6200ee'}}>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        activeOpacity={0.4}
        onPress={handleOnPress}>
        <Image
          source={require('../assets/logo_shw.jpg')}
          style={{
            margin: 4,
            height: 35,
            width: 25,
            resizeMode: 'stretch',
          }}
        />
        <Text style={{color: '#ffffff', fontSize: 18}}>Open Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
