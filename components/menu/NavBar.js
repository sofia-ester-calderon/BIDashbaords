/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import * as Navigation from './RootNavigation';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import {useCompany} from '../hooks/CompanyProvider';

const menu = require('../assets/menu_icon.png');

const NavBar = () => {
  const [userPermissions] = useUserPermissions();
  const [company] = useCompany();

  const handleOnPress = () => {
    if (userPermissions.loggedIn && company) {
      Navigation.toggleDrawer();
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#6200ee'}}>
      <TouchableOpacity
        style={styles.HeaderStyle}
        activeOpacity={0.4}
        onPress={handleOnPress}>
        {userPermissions.loggedIn && company && (
          <Image style={styles.MenuIconStyle} source={menu} />
        )}
        {/* <Image source={logoShw} style={styles.ImageIconStyle} /> */}
        {company && (
          <View style={styles.ImageIconStyle}>
            <SvgXml xml={company.logo} />
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HeaderStyle: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },

  ImageIconStyle: {
    backgroundColor: 'white',
    height: 30,
    padding: 5,
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
