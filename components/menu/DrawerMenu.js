/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {navigationRef} from './RootNavigation';
import ViewerContainer from '../dashboards/ViewerContainer';
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
      (item) => item.name !== 'Home' && item.name !== 'Login',
    );

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList state={newState} {...rest} />
      </DrawerContentScrollView>
    );
  };

  useEffect(() => {
    if (userPermissions.roles) {
      database()
        .ref(`/categories`)
        .once('value')
        .then((categoriesSnapshot) => {
          const categoryInfo = categoriesSnapshot
            .val()
            .filter((categoryData) =>
              categoryData.roles.some(
                (r) => userPermissions.roles.indexOf(r) >= 0,
              ),
            )
            .map((categoryData, index) => {
              return {
                name: categoryData.name[userPermissions.language],
                index,
              };
            });
          setCategories(categoryInfo);
        });
    }
  }, [userPermissions.roles]);

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
            key={category.index}
            name={category.name}
            component={ViewerContainer}
            initialParams={{
              categoryIndex: category.index,
            }}
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
