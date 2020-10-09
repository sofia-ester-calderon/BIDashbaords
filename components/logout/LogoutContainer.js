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

  let messages2 = {};

  const getMessages = () => {
    console.log(
      '4 getMessages() start, sprache ist: ',
      userPermissions.language,
    );
    database()
      .ref(`/messages/logout/${userPermissions.language}`)
      .once('value')
      .then((logoutSnapshot) => {
        console.log('5 logoutSnapshot: ', logoutSnapshot.val());
        const tmpMessages = logoutSnapshot.val();
        console.log('6 tmpMessages ist: ', tmpMessages);
        messages2 = tmpMessages;
        setMessages({...tmpMessages});
        console.log('7 messages ist: ', messages2);
      });
    console.log(
      '8 getMessages() ende, sprache ist: ',
      userPermissions.language,
    );
  };

  useEffect(() => {
    console.log('1 messages ist: ', messages2);
    console.log('2 und question ist: ', messages2.question);
    console.log('3 und no ist: ', messages2.no);
  }, [messages2]);
  // useEffect(() => {
  //   getMessages();
  // }, [userPermissions.language]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('9 Callback-Start ', messages2);
      setMessages({});
      console.log('10 vor getMessages()-Aufruf ', messages2);
      getMessages();
      console.log('11 nach getMessages()-Aufruf, vor Timeout ', messages2);
      setTimeout(() => {
        console.log('12 Timeout, vor Alert-Aufruf ', messages2);
        Alert.alert(
          'Logout',
          messages2.question
            ? messages2.question
            : 'leider nix gefunden' /* 'Are you sure you want to logout?' */,
          [
            {
              text: messages2.yes,
              onPress: () => handleLogout(),
            },
            {text: messages2.no, onPress: () => navigation.navigate('Home')},
          ],
          {cancelable: true},
        );
        console.log('13 Timeout ende, nach Alert()', messages2);
      }, 444);
      console.log('14 Callback-Ende', messages2);

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
