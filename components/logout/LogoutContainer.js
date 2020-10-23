/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import {useLanguage} from '../hooks/LanguageProvider';
import {useMessages} from '../hooks/MessagesProvider';
import {useCompany} from '../hooks/CompanyProvider';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [company, setCompany] = useCompany();
  const [language] = useLanguage();
  const [focused, setFocused] = useState(false);
  const [messages] = useMessages();

  useFocusEffect(
    React.useCallback(() => {
      setFocused(true);
      return () => {
        setFocused(false);
      };
    }, []),
  );

  useEffect(() => {
    const logoutMessages = messages[language].logout;
    if (messages && focused) {
      Alert.alert(
        'Logout',
        logoutMessages.question,
        [
          {
            text: logoutMessages.yes,
            onPress: () => handleLogout(),
          },
          {text: logoutMessages.no, onPress: () => navigation.navigate('Home')},
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
    setCompany();
    navigation.navigate('Login');
  };

  return <></>;
};

LogoutContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogoutContainer;
