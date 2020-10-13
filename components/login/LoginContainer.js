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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoginDetails({...loginDetails, password: ''});
      setLoading(false);
      return () => {
        // Do something when the screen is unfocused
      };
    }, []),
  );

  function onAuthStateChanged(user) {
    if (user && (!loggedInUser || user.uid !== loggedInUser.uid)) {
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then((userSnapshot) => {
          setLoggedInUser(userSnapshot.val());
          userFunctions.loginUser({
            id: user.uid,
            loggedIn: true,
            roles: userSnapshot.val().roles,
            companies: userSnapshot.val().companies,
          });
          navigation.navigate('Select Company');
          setLoading(false);
        });
    }
  }

  const handleLoginDetailsChanged = (value, key) => {
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    const formErrors = {};
    if (loginDetails.username === '') formErrors.username = '!';
    if (loginDetails.password === '') formErrors.password = '!';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = () => {
    if (isFormValid()) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(
          loginDetails.username,
          loginDetails.password,
        )
        .then(() => {})
        .catch((error) => {
          setLoading(false);
          console.log(error.code);
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
