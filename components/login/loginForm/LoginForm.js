/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {PropTypes} from 'prop-types';

const LoginForm = ({loginDetails, onChange}) => {
  return (
    <View>
      <TextInput
        label="Username"
        value={loginDetails.username}
        onChangeText={(text) => onChange(text, 'username')}
      />
      <TextInput
        label="Password"
        value={loginDetails.password}
        onChangeText={(text) => onChange(text, 'password')}
      />
    </View>
  );
};

LoginForm.propTypes = {
  loginDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LoginForm;
