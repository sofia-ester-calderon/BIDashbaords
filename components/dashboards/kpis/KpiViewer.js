/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

const KpiViewer = ({kpi}) => {
  return (
    <SafeAreaView style={styles.conatiner}>
      <Text>{kpi.kpi}</Text>
      <Text>Metabase url: {kpi.METABASE_SITE_URL}</Text>
      <WebView
        source={{
          uri: `http://134.209.57.186:3000/`,
        }}
      />
    </SafeAreaView>
  );
};

KpiViewer.propTypes = {
  kpi: PropTypes.object.isRequired,
};

export default KpiViewer;
