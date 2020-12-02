/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Image} from 'react-native';
import {navigationRef} from './RootNavigation';
import ViewerContainer from '../dashboards/ViewerContainer';
import LoginContainer from '../login/LoginContainer';
import LogoutContainer from '../logout/LogoutContainer';
import Home from '../home/Home';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import CompaniesContainer from '../companies/CompaniesContainer';
import {useLanguage} from '../hooks/LanguageProvider';
import * as firebaseHelper from '../firebase/firebaseHelper';

const graphIcon = require('../assets/graph.png');

const DrawerMenu = () => {
  const [userPermissions] = useUserPermissions();
  const [language] = useLanguage();

  const [categories, setCategories] = useState([]);
  const [oneCompany, setOneCompany] = useState(false);

  const Drawer = createDrawerNavigator();

  useEffect(() => {
    if (userPermissions.companies) {
      setOneCompany(userPermissions.companies.length === 1);
    }
  }, [userPermissions.companies]);

  const CustomDrawerContent = (props) => {
    const {state, ...rest} = props;
    const newState = {...state};
    newState.routes = newState.routes.filter((item) => filterDrawerItems(item));

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList state={newState} {...rest} />
      </DrawerContentScrollView>
    );
  };

  const filterDrawerItems = (item) => {
    if (item.name === 'Home' || item.name === 'Login') {
      return false;
    }
    if (oneCompany && item.name === 'Select Company') {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (userPermissions.roles && language) {
      firebaseHelper.getCategories().then((snapshot) => {
        const categoryInfo = snapshot
          .filter((categoryData) =>
            categoryData.roles.some(
              (r) => userPermissions.roles.indexOf(r) >= 0,
            ),
          )
          .map((categoryData, index) => {
            return {
              name: categoryData.name[language],
              index,
            };
          });
        setCategories(categoryInfo);
      });
    }
  }, [userPermissions.roles, language]);

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
            options={{
              drawerIcon: ({focused, size}) => (
                <Image
                  source={graphIcon}
                  style={{
                    height: size,
                    width: size,
                    paddingRight: 0,
                    marginRight: 0,
                  }}
                />
              ),
            }}
          />
        ))}
        <Drawer.Screen name="Select Company" component={CompaniesContainer} />
        <Drawer.Screen name="Logout" component={LogoutContainer} />
        <Drawer.Screen name="Login" component={LoginContainer} />
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerMenu;
