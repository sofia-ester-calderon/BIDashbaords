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
import {useLanguage} from '../hooks/LanguageProvider';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [language] = useLanguage();
  const [focused, setFocused] = useState(false);
  const [messages, setMessages] = useState();

  useFocusEffect(
    React.useCallback(() => {
      console.log('FOCUSSING LOGOUT VIEW');
      setFocused(true);
      return () => {
        console.log('UNFOCUSSING LOGOUT VIEW');
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    console.log('IN LOGOUT get message of language', language);
    database()
      .ref(`/messages/${language}/logout`)
      .once('value')
      .then((logoutSnapshot) => {
        console.log('got message', logoutSnapshot.val());
        setMessages(logoutSnapshot.val());
      });
  }, [language]);

  useEffect(() => {
    console.log('IN LOGOUT create alert dialog', focused, language);
    if (messages && focused) {
      Alert.alert(
        'Logout',
        messages.question,
        [
          {
            text: messages.yes,
            onPress: () => handleLogout(),
          },
          {text: messages.no, onPress: () => navigation.navigate('Home')},
        ],
        {cancelable: true},
      );
    }
  }, [messages, focused]);

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
