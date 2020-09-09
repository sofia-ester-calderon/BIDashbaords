import React, {useState} from 'react';
import LoginForm from './loginForm/LoginForm';
import data from '../../data/data';

const LoginContainer = () => {
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
        console.log('user logged in', loggedInUser.role);
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

export default LoginContainer;
