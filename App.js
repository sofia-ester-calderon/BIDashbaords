import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';

import {WebView} from 'react-native-webview';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.conatiner}>
        <Text numberOfLines={5}>
          Here you can view your metabase dashbaords!
        </Text>
        <WebView source={{uri: 'https://www.google.com'}} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});

export default App;
