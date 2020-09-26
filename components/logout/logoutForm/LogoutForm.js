/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {PropTypes} from 'prop-types';

const LogoutForm = ({onLogout}) => {
  return (
    <View>
      <Button mode="contained" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
};

LogoutForm.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutForm;
