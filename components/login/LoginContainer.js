/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
import React, {useState, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import {useFocusEffect} from '@react-navigation/native';
import LoginForm from './loginForm/LoginForm';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LoginContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  useEffect(() => {
    console.log('im LoginContainer, start von useEffect()-subscriber');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log('im LoginContainer, end von useEffect()-subscriber');
    return subscriber;
  }, []);

  console.log('im LoginContainer init!!!');
  useFocusEffect(
    React.useCallback(() => {
      console.log(
        'im LoginContainer start von useFocusEffect(). Login details:',
        loginDetails,
      );
      setLoginDetails({...loginDetails, password: ''});
      setLoading(false);
      console.log('im LoginContainer ende von useFocusEffect()');
      return () => {
        // Do something when the screen is unfocused
      };
    }, []),
  );

  function onAuthStateChanged(user) {
    console.log(
      'im LoginContainer, start von onAuthStateChanged(), user: ',
      user,
      'loggedInUser: ',
      loggedInUser,
    );
    if (user && (!loggedInUser || user.uid !== loggedInUser.uid)) {
      console.log(
        "im LoginContainer, onAuthStateChanged() vor 'database()'-Aufruf ",
      );
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then((userSnapshot) => {
          setLoggedInUser(userSnapshot.val());
          console.log(
            "im LoginContainer, onAuthStateChanged() vor 'loginUser()'-Aufruf ",
          );
          userFunctions.loginUser({
            id: user.uid,
            loggedIn: true,
            roles: userSnapshot.val().roles,
            companies: userSnapshot.val().companies,
          });
          console.log("im LoginContainer vor 'Select Company'-Aufruf ");
          if (userPermissions.loggedIn) {
            navigation.navigate('Select Company');
            setLoading(false);
          }
          console.log("im LoginContainer nach 'Select Company'-Aufruf ");
        });
      console.log('im LoginContainer, end von onAuthStateChanged(): ');
    }
  }

  const handleLoginDetailsChanged = (value, key) => {
    console.log('im LoginContainer, start von handleLoginDetailsChanged() ');
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
    console.log('im LoginContainer, end von handleLoginDetailsChanged() ');
  };

  const isFormValid = () => {
    console.log('im LoginContainer, start von isformValid() ');
    const formErrors = {};
    if (loginDetails.username === '') formErrors.username = '!';
    if (loginDetails.password === '') formErrors.password = '!';
    setErrors(formErrors);
    console.log(
      'im LoginContainer, end von isFormValid() . Ergebnis: ',
      Object.keys(formErrors).length === 0,
    );
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = () => {
    console.log(
      'im LoginContainer, start von handleLogin(). username: ',
      loginDetails.username,
      'password: ',
      loginDetails.password,
    );
    if (isFormValid()) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(
          loginDetails.username,
          loginDetails.password,
        )
        .then(() => {
          console.log('im LoginContainer, handleLogin(), then-Teil ');
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            'Fehler bei Firebase-Authentication. Fehler: ',
            error.code,
          );
          if (
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/invalid-email'
          ) {
            setErrors({username: '!'});
            return;
          }
          if (error.code === 'auth/wrong-password') {
            setErrors({password: '!'});
            return;
          }
          setErrors({
            username: '!',
            password: '!',
          });
        });
    }
    // eslint-disable-next-line no-console
    console.log('im LoginContainer, end von handleLogin() ');
  };

  return (
    <>
      <Spinner
        visible={loading}
        textStyle={{
          color: '#FFF',
        }}
      />
      <LoginForm
        loginDetails={loginDetails}
        onChange={handleLoginDetailsChanged}
        onLogin={handleLogin}
        errors={errors}
      />
    </>
  );
};

LoginContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginContainer;
