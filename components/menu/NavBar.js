import * as React from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Navigation from './RootNavigation';

const NavBar = () => {
  return (
    <SafeAreaView>
      <Button title="Open Menu" onPress={() => Navigation.toggleDrawer()} />
    </SafeAreaView>
  );
};

export default NavBar;
