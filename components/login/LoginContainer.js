/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
import {PropTypes} from 'prop-types';
import LoginForm from './loginForm/LoginForm';
import data from '../../data/data';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LoginContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();

  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    company: '',
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    company: null,
  });

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
    if (loginDetails.company === '')
      formErrors.company = 'Please enter a company';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = () => {
    if (isFormValid()) {
      const loggedInUser = data.getLoginUser(
        loginDetails.username,
        loginDetails.password,
        loginDetails.company,
      );
      if (loggedInUser) {
        userFunctions.loginUser(loggedInUser);
        navigation.navigate('Home');
        handleLoginDetailsChanged('', 'username');
        handleLoginDetailsChanged('', 'password');
        handleLoginDetailsChanged('', 'company');
      } else {
        const formErrors = {};
        formErrors.username = 'Invalid credentials';
        formErrors.password = 'Invalid credentials';
        formErrors.company = 'Invalid credentials';
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
