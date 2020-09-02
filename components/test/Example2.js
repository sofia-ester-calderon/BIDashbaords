import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {WebView} from 'react-native-webview';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

const Example2 = () => {
  return (
    <SafeAreaView style={styles.conatiner}>
      <Text numberOfLines={5}>Here you can view your metabase dashbaords! - EXAMPLE 2</Text>
      <WebView source={{uri: 'https://www.google.com'}} />
    </SafeAreaView>
  );
};

export default Example2;
