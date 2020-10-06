/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Button, HelperText, Text} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import {PropTypes} from 'prop-types';
import companies from '../../../data/companies';

const styles = StyleSheet.create({
  error: {
    color: '#A92F3E',
    margin: 5,
  },
});

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
        placeholder="enter user name"
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
        placeholder="enter password"
        secureTextEntry
      />
      <HelperText type="error" visible>
        {errors.password}
      </HelperText>
      <Picker
        selectedValue={loginDetails.companyID}
        onValueChange={(itemValue, itemIndex) =>
          onChange(itemValue, 'companyID')
        }>
        <Picker.Item label="Please select a company..." value="0" />
        {companies.map((company) => (
          <Picker.Item
            label={company.companyName}
            value={company.companyID}
            key={company.companyID}
          />
        ))}
      </Picker>
      <Text style={styles.error}>{errors.companyID}</Text>
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
