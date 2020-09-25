import React from 'react';
import {
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
        style={styles.HeaderStyle}
        activeOpacity={0.4}
        onPress={handleOnPress}>
        <Image
          source={require('../assets/logo_shw.jpg')}
          style={styles.ImageIconStyle}
        />
        <Text style={styles.TextStyle}>Open Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {flexDirection: 'row'},

  ImageIconStyle: {
    margin: 4,
    height: 25,
    width: 18,
    resizeMode: 'stretch',
  },

  TextStyle: {color: '#ffffff', fontSize: 18},
});

export default NavBar;
