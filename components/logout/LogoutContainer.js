/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [messages, setMessages] = useState({});

  const getMessages = () => {
    console.log('4 sprache ist: ', userPermissions.language);
    database()
      .ref(`/messages/logout/${userPermissions.language}`)
      .once('value')
      .then((logoutSnapshot) => {
        console.log('5 logoutSnapshot: ', logoutSnapshot.val());
        const tmpMessages = logoutSnapshot.val();
        console.log('6 tmpMessages ist: ', tmpMessages);
        setMessages({...tmpMessages});
        console.log('7 messages ist: ', messages);
      });
  };

  useEffect(() => {
    console.log('1 messages ist: ', messages);
    console.log('2 und question ist: ', messages.question);
    console.log('3 und no ist: ', messages.no);
  }, [messages]);
  // useEffect(() => {
  //   getMessages();
  // }, [userPermissions.language]);

  useFocusEffect(
    React.useCallback(() => {
      setMessages({});
      getMessages();
      Alert.alert(
        'Logout',
        messages.question
          ? messages.question
          : 'leider nix gefunden' /* 'Are you sure you want to logout?' */,
        [
          {
            text: 'Yes',
            onPress: () => handleLogout(),
          },
          {text: 'No', onPress: () => navigation.navigate('Home')},
        ],
        {cancelable: true},
      );
      console.log('9 Nach Alert-Aufruf ', messages);

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
