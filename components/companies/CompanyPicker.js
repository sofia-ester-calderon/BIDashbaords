/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {PropTypes} from 'prop-types';
import {Picker} from '@react-native-community/picker';
import {Button} from 'react-native-paper';

const CompanyPicker = ({companies, onChange, selectedValue, onSelect}) => {
  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onChange(itemValue)}>
        {companies.map((company) => (
          <Picker.Item
            label={company.name}
            value={company.id}
            key={company.id}
          />
        ))}
      </Picker>
      <Button mode="contained" onPress={onSelect}>
        Select Company
      </Button>
    </View>
  );
};

CompanyPicker.propTypes = {
  companies: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default CompanyPicker;
