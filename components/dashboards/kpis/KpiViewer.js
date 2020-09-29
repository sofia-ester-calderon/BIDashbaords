/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {WebView} from 'react-native-webview';
import {Image, Alert} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const infoIcon = require('../../assets/info_icon.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    flexDirection: 'row',
  },
  infoIconStyle: {
    margin: 4,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});

const KpiViewer = ({kpi}) => {
  const createAlert = () => {
    Alert.alert(
      'KPI INFO',
      kpi.description,
      [
        {
          text: 'Back',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textArea}>
        <Text>{kpi.kpi}</Text>
        <TouchableWithoutFeedback onPress={createAlert}>
          <Image style={styles.infoIconStyle} source={infoIcon} />
        </TouchableWithoutFeedback>
      </View>
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
