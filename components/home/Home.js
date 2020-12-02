import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useMessages} from '../hooks/MessagesProvider';

const homeLogo = require('../assets/logo_westfalia_pferd_transparent2.png');
const homeText = require('../assets/logo_westfalia_schriftzug_transparent2.png');

const styles = StyleSheet.create({
  logoIconStyle: {
    height: 250,
    width: 260,
  },
  textIconStyle: {
    margin: 7,
    height: 90,
    width: 260,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

const Home = () => {
  const [messages] = useMessages();
  const [homeMessages, setHomeMessages] = useState({});

  useEffect(() => {
    if (messages) {
      setHomeMessages(messages.home);
    }
  }, [messages]);

  return (
    <View style={styles.layout}>
      <Image style={styles.logoIconStyle} source={homeLogo} />
      <Image style={styles.textIconStyle} source={homeText} />
      <Text style={styles.mainText}>{homeMessages.title1}</Text>
      <Text style={styles.mainText}>{homeMessages.title2}</Text>
      <Text style={styles.subText}>{homeMessages.slogan}</Text>
    </View>
  );
};

export default Home;
