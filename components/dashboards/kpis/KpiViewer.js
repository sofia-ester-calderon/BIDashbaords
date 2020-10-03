/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {StyleSheet, View, Image, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {WebView} from 'react-native-webview';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import companies from '../../../data/companies.json';
import {useUserPermissions} from '../../hooks/UserPermissionsProvider';

const infoIcon = require('../../assets/info_icon_2.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalLayout: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  infoIconStyle: {
    margin: 4,
    height: 25,
    width: 27,
    resizeMode: 'stretch',
  },
  textInfo: {
    backgroundColor: 'white',
    textAlignVertical: 'center',
    fontSize: 18,
  },
  textNumbering: {
    backgroundColor: 'white',
    textAlignVertical: 'center',
    fontSize: 18,
    marginStart: 10,
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
      {cancelable: false},
    );
  };

  const [userPermissions, userFunctions] = useUserPermissions();
  const currentCompany = companies.find(
    (company) => userPermissions.company === company.companyName,
  );
  const uri = currentCompany.url.concat('/embed/question/', token);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: uri,
        }}
      />
      <View style={styles.horizontalLayout}>
        <View style={{flex: 1}}>
          <Text style={styles.textNumbering}>
            {count} of {totalCount}
          </Text>
        </View>
        <View style={({flex: 1}, styles.horizontalLayout)}>
          <Text style={styles.textInfo} onPress={createAlert}>
            Information
          </Text>
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
