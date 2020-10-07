import React from 'react';
import {Alert, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Navigation from './RootNavigation';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const logoShw = require('../assets/logo_shw.jpg');
const menu = require('../assets/menu_icon.png');

const NavBar = () => {
  const [userPermissions] = useUserPermissions();

  const handleOnPress = () => {
    if (userPermissions.loggedIn && userPermissions.company) {
      Navigation.toggleDrawer();
    } else {
      Alert.alert('', 'Please complete Login First!', [{text: 'OK'}], {
        cancelable: true,
      });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#6200ee'}}>
      <TouchableOpacity
        style={styles.HeaderStyle}
        activeOpacity={0.4}
        onPress={handleOnPress}>
        <Image style={styles.MenuIconStyle} source={menu} />
        <Image source={logoShw} style={styles.ImageIconStyle} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 15,
    justifyContent: 'space-between',
  },

  ImageIconStyle: {
    height: 35,
    width: 25,
    resizeMode: 'stretch',
  },
  MenuIconStyle: {
    height: 25,
    width: 30,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },

  TextStyle: {color: '#ffffff', fontSize: 18},
});

export default NavBar;
