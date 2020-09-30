/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, Button, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const backArrow = require('../../assets/back_arrow.jpg');
const forwardArrow = require('../../assets/forward_arrow.jpg');

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  horizontalLayout: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    <SafeAreaView style={styles.horizontalLayout}>
      {kpiCount > 1 && (
        <>
          <TouchableOpacity onPress={onPrevious}>
            <Image style={styles.arrowIconStyle} source={backArrow} />
          </TouchableOpacity>
        </>
      )}
      <Button title="Back to subcategories" onPress={onBack} />
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
