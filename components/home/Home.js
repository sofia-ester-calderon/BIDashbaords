import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Text} from 'react-native-paper';
const homeLogo = require('../assets/logo_shw.png');

const styles = StyleSheet.create({
  logoIconStyle: {
    margin: 20,
    height: 250,
    width: 200,
    resizeMode: 'stretch',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const Home = () => {
  return (
    <View style={styles.layout}>
      <Image style={styles.logoIconStyle} source={homeLogo} />
      <Text style={styles.mainText}>
        Soluciones {'\n'} Business Intelligence
      </Text>
      <Text style={styles.subText}>
        "Optimizando los procesos empresariales"
      </Text>
    </View>
  );
};

export default Home;
