/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

const backArrow = require('../../assets/back_arrow.png');
const forwardArrow = require('../../assets/forward_arrow.png');

const styles = StyleSheet.create({
  horizontalLayout: {
    backgroundColor: '#7852E3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  horizontalLayoutCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#7852E3',
    height: 55,
  },
  arrowIconStyle: {
    margin: 8,
    height: 40,
    width: 40,
  },
  button: {
    margin: 9,
    height: 36,
  },
});

const DashboardNavigator = ({
  onNext,
  onPrevious,
  onBack,
  kpiCount,
  texts = {},
}) => {
  return (
    <View
      style={
        kpiCount > 1 ? styles.horizontalLayout : styles.horizontalLayoutCentered
      }>
      {kpiCount > 1 && (
        <TouchableOpacity onPress={onPrevious}>
          <Image style={styles.arrowIconStyle} source={backArrow} />
        </TouchableOpacity>
      )}
      <Button
        mode="outlined"
        onPress={onBack}
        style={styles.button}
        labelStyle={{color: 'white'}}>
        {texts.goback}
      </Button>
      {kpiCount > 1 && (
        <TouchableOpacity onPress={onNext}>
          <Image style={styles.arrowIconStyle} source={forwardArrow} />
        </TouchableOpacity>
      )}
    </View>
  );
};

DashboardNavigator.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  texts: PropTypes.object,
};

export default DashboardNavigator;
