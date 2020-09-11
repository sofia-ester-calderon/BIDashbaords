/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
import {PropTypes} from 'prop-types';
import LoginForm from './loginForm/LoginForm';
import data from '../../data/data';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LoginContainer = ({navigation}) => {
  const [userPermissions, loginUser] = useUserPermissions();

  const [loginDetails, setLoginDetails] = useState({username: '', password: ''});
  const [errors, setErrors] = useState({username: null, password: null});

  const handleLoginDetailsChanged = (value, key) => {
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const isFormValid = () => {
    const formErrors = {};
    if (loginDetails.username === '') formErrors.username = 'Username is invalid';
    if (loginDetails.password === '') formErrors.password = 'Please enter a password';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = () => {
    if (isFormValid()) {
      const loggedInUser = data.loginUser(loginDetails.username, loginDetails.password);
      if (loggedInUser) {
        loginUser(loggedInUser);
        navigation.navigate('Home');
      } else {
        const formErrors = {};
        formErrors.username = 'Invalid credentials';
        formErrors.password = 'Invalid credentials';
        setErrors(formErrors);
      }
    }
  };

  return (
    <LoginForm
      loginDetails={loginDetails}
      onChange={handleLoginDetailsChanged}
      onLogin={handleLogin}
      errors={errors}
    />
  );
};

LoginContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginContainer;
