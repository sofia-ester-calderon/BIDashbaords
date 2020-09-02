import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Example2 from '../test/Example2';
import Example1 from '../test/Example1';
import {navigationRef} from './RootNavigation';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Example1" component={Example1} />
        <Drawer.Screen name="Example2" component={Example2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerMenu;
