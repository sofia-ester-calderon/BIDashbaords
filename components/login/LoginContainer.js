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
import LoginForm from './loginForm/LoginForm';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LoginContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    companyID: '',
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    companyID: null,
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      if (!loggedInUser.companies.includes(loginDetails.companyID)) {
        setErrors({companyID: 'You are not a member of this company'});
        auth()
          .signOut()
          .then(() => {});
        setLoading(false);
        return;
      }
      database()
        .ref(`/companies/${loginDetails.companyID}`)
        .once('value')
        .then((companySnapshot) => {
          const company = companySnapshot.val();
          userFunctions.loginUser({
            id: loggedInUser.uid,
            loggedIn: true,
            role: loggedInUser.role,
            companyID: loginDetails.companyID,
            language: company.language,
          });
          navigation.navigate('Home');
        });
    }
  }, [loggedInUser]);

  function onAuthStateChanged(user) {
    if (user && (!loggedInUser || user.uid !== loggedInUser.uid)) {
      database()
        .ref(`/users/${user.uid}`)
        .once('value')
        .then((userSnapshot) => {
          const userData = userSnapshot.val();
          setLoggedInUser({...userData, id: user.uid});
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
    if (loginDetails.username === '')
      formErrors.username = 'Please enter a username';
    if (loginDetails.password === '')
      formErrors.password = 'Please enter a password';
    if (loginDetails.companyID == 0)
      formErrors.companyID = 'Please select a company';
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
          if (
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/invalid-email'
          ) {
            setErrors({username: 'Username does not exist'});
            return;
          }
          if (error.code === 'auth/wrong-password') {
            setErrors({password: 'Wrong password'});
            return;
          }
          setErrors({
            username: 'Wrong credentials',
            password: 'Wrong credentials',
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
