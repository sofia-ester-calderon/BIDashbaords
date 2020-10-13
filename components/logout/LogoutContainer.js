/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {PropTypes} from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import {useMessages} from '../hooks/MessagesProvider';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [messages, setMessages] = useMessages();

  useFocusEffect(
    React.useCallback(() => {
      Alert.alert(
        messages.logout.title,
        messages.logout.question,
        [
          {
            text: messages.logout.yes,
            onPress: () => handleLogout(),
          },
          {
            text: messages.logout.no,
            onPress: () => navigation.navigate('Home'),
          },
        ],
        {cancelable: true},
      );

      return () => {
        // Do something when the screen is unfocused
      };
    }, []),
  );

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        logout();
      })
      .catch((error) => {
        console.log(error);
        logout();
      });
  };

  const logout = () => {
    userFunctions.logoutUser();
    navigation.navigate('Login');
  };

  return <></>;
};

LogoutContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogoutContainer;
