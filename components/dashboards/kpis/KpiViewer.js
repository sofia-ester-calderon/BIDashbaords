/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {WebView} from 'react-native-webview';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

const infoIcon = require('../../assets/info_icon_2.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalLayout: {
    flexDirection: 'row',
    backgroundColor: '#7852E3',
    padding: 5,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIconStyle: {
    margin: 4,
    height: 25,
    width: 27,
    resizeMode: 'stretch',
  },
  textInfo: {
    fontSize: 18,
    color: 'white',
  },
});

const KpiViewer = ({kpi, token = '', count, totalCount}) => {
  const createAlert = () => {
    Alert.alert(
      'INFORMACIÓN',
      kpi.description,
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false}
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
        <View style={{flex: 1}}>
          <Text style={styles.textInfo}>
            {count} of {totalCount}
          </Text>
        </View>
        <View style={({flex: 1}, styles.horizontalLayout)}>
          <TouchableWithoutFeedback onPress={createAlert}>
            <Image style={styles.infoIconStyle} source={infoIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

KpiViewer.propTypes = {
  kpi: PropTypes.object.isRequired,
  token: PropTypes.string,
  count: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default KpiViewer;
