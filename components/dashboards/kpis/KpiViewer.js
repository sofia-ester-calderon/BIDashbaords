/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import jwt from 'react-native-pure-jwt';

import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

const KpiViewer = ({kpi}) => {
  const payload = {
    resource: {question: 20},
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60,
  };

  const token = jwt.sign(payload, kpi.METABASE_SECRET_KEY, {
    alg: 'HS256',
  });

  console.log(token);

  return (
    <SafeAreaView style={styles.conatiner}>
      <Text>{kpi.kpi}</Text>
      <Text>Metabase url: {kpi.METABASE_SITE_URL}</Text>
      <WebView
        source={{
          uri: `${kpi.METABASE_SITE_URL}/embed/question/${token}`,
        }}
      />
    </SafeAreaView>
  );
};

KpiViewer.propTypes = {
  kpi: PropTypes.object.isRequired,
};

export default KpiViewer;
