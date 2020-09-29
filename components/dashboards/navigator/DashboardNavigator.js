/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
});

const DashboardNavigator = ({onNext, onPrevious, onBack, kpiCount}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Back to Subcategories" onPress={onBack} />
      {kpiCount > 1 && (
        <>
          <Button title="Previous" onPress={onPrevious} />
          <Button title="Next" onPress={onNext} />
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
