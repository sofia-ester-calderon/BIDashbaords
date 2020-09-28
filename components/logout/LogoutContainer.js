/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {PropTypes} from 'prop-types';
import LogoutForm from './logoutForm/LogoutForm';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const LogoutContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();

  const handleLogout = () => {
    userFunctions.logoutUser();
    navigation.navigate('Login');
  };

  return <LogoutForm onLogout={handleLogout} />;
};

LogoutContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LogoutContainer;
