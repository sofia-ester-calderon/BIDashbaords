import React from 'react';
import {Alert, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Navigation from './RootNavigation';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const NavBar = () => {
  const [userPermissions] = useUserPermissions();

  return (
    <SafeAreaView>
      <Button
        title="Open Menu"
        onPress={() => {
          if (userPermissions.loggedIn) {
            Navigation.toggleDrawer();
          } else {
            Alert.alert('Message', 'Please Log in First', [{text: 'OK'}], {
              cancelable: true,
            });
          }
        }}
      />
    </SafeAreaView>
  );
};

export default NavBar;
