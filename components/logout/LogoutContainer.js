/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {PropTypes} from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Yes',
            onPress: () => handleLogout(),
          },
          {text: 'No', onPress: () => navigation.navigate('Home')},
        ],
        {cancelable: true}
      );

      return () => {
        // Do something when the screen is unfocused
      };
    }, [])
  );

  const handleLogout = () => {
    userFunctions.logoutUser();
    navigation.navigate('Login');
  };

  return <></>;
};

LogoutContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogoutContainer;
