import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import ViewerContainer from '../dashboards/ViewerContainer';
import data from '../../data/data';
import LoginContainer from '../login/LoginContainer';
import Home from '../home/Home';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const DrawerMenu = () => {
  const [userPermissions] = useUserPermissions();

  const [categories, setCategories] = useState([]);
  const Drawer = createDrawerNavigator();

  useEffect(() => {
    setCategories(data.getCategories);
  }, []);

  useEffect(() => {
    console.log('got new userPermissions', userPermissions);
  }, [userPermissions]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginContainer} />
        <Drawer.Screen name="Home" component={Home} />
        {categories.map((category) => (
          <Drawer.Screen
            key={category}
            name={category}
            component={ViewerContainer}
            initialParams={{category}}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerMenu;
