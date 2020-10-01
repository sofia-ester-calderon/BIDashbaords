/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

const backArrow = require('../../assets/back_arrow.jpg');
const forwardArrow = require('../../assets/forward_arrow.jpg');

const styles = StyleSheet.create({
  horizontalLayout: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalLayoutCentered: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  arrowIconStyle: {
    margin: 4,
    height: 45,
    width: 40,
    resizeMode: 'stretch',
  },
});

const DashboardNavigator = ({onNext, onPrevious, onBack, kpiCount}) => {
  return (
    <SafeAreaView
      style={
        kpiCount > 1 ? styles.horizontalLayout : styles.horizontalLayoutCentered
      }>
      {kpiCount > 1 && (
        <>
          <TouchableOpacity onPress={onPrevious}>
            <Image style={styles.arrowIconStyle} source={backArrow} />
          </TouchableOpacity>
        </>
      )}
      <Button mode="outlined" onPress={onBack}>
        Go Back{' '}
      </Button>
      {kpiCount > 1 && (
        <>
          <TouchableOpacity onPress={onNext}>
            <Image style={styles.arrowIconStyle} source={forwardArrow} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

DashboardNavigator.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DashboardNavigator;
