import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import ViewerContainer from '../dashboards/ViewerContainer';
import data from '../../data/data';
import LoginContainer from '../login/LoginContainer';
import LogoutContainer from '../logout/LogoutContainer';
import Home from '../home/Home';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const DrawerMenu = () => {
  const [userPermissions] = useUserPermissions();

  const [categories, setCategories] = useState([]);
  const Drawer = createDrawerNavigator();

  const CustomDrawerContent = (props) => {
    const {state, ...rest} = props;
    const newState = {...state};
    newState.routes = newState.routes.filter(
      (item) => item.name !== 'Home' && item.name !== 'Login'
    );

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList state={newState} {...rest} />
      </DrawerContentScrollView>
    );
  };

  useEffect(() => {
    setCategories(data.getCategories(userPermissions.role));
  }, [userPermissions.role]);

  useEffect(() => {}, [userPermissions]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="Login"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
        }}>
        {categories.map((category) => (
          <Drawer.Screen
            key={category}
            name={category}
            component={ViewerContainer}
            initialParams={{category}}
          />
        ))}
        <Drawer.Screen name="Login" component={LoginContainer} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Logout" component={LogoutContainer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerMenu;
