import React, {useState} from 'react';
import LoginForm from './loginForm/LoginForm';

const LoginContainer = () => {
  const [loginDetails, setLoginDetails] = useState({username: '', password: ''});

  const handleLoginDetailsChanged = (value, key) => {
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };
  return <LoginForm loginDetails={loginDetails} onChange={handleLoginDetailsChanged} />;
};

export default LoginContainer;
