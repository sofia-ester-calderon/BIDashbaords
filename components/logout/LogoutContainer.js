/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
import React, {useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import {useMessages} from '../hooks/MessagesProvider';
import {useCompany} from '../hooks/CompanyProvider';
import * as firebaseHelper from '../firebase/firebaseHelper';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [company, setCompany] = useCompany();
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
    if (messages && focused) {
      const logoutMessages = messages.logout;
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
    firebaseHelper.logoutUser();
    logout();
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
