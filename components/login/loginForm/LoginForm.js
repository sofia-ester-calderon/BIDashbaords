/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {View} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {PropTypes} from 'prop-types';

const LoginForm = ({loginDetails, onChange, onLogin, errors}) => {
  return (
    <View>
      <TextInput
        label="Username"
        value={loginDetails.username}
        onChangeText={(text) => onChange(text, 'username')}
        error={errors.username}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <HelperText type="error" visible>
        {errors.username}
      </HelperText>
      <TextInput
        label="Password"
        value={loginDetails.password}
        onChangeText={(text) => onChange(text, 'password')}
        error={errors.password}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <HelperText type="error" visible>
        {errors.password}
      </HelperText>
      <Button mode="contained" onPress={onLogin}>
        Login
      </Button>
    </View>
  );
};

LoginForm.propTypes = {
  loginDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default LoginForm;
