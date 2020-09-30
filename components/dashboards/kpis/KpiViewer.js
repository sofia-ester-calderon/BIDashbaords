/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {Text, StyleSheet, View, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {WebView} from 'react-native-webview';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const infoIcon = require('../../assets/info_icon_2.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalLayout: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  infoIconStyle: {
    margin: 4,
    height: 25,
    width: 27,
    resizeMode: 'stretch',
  },
  text: {
    backgroundColor: 'white',
    textAlignVertical: 'center',
  },
});

const KpiViewer = ({kpi, token}) => {
  const createAlert = () => {
    Alert.alert(
      'INFORMACIÓN',
      kpi.description,
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: `http://134.209.57.186:3000/embed/question/${token}`,
        }}
      />
      <View style={styles.horizontalLayout}>
        <Text style={styles.text} onPress={createAlert}>
          Information
        </Text>
        <TouchableWithoutFeedback onPress={createAlert}>
          <Image style={styles.infoIconStyle} source={infoIcon} />
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

KpiViewer.propTypes = {
  kpi: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default KpiViewer;
