import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useLanguage} from '../hooks/LanguageProvider';
import {useMessages} from '../hooks/MessagesProvider';

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
  const [language] = useLanguage();
  const [messages] = useMessages();
  const [homeMessages, setHomeMessages] = useState({});

  useEffect(() => {
    if (messages && messages[language]) {
      setHomeMessages(messages[language].home);
    }
  }, [messages]);

  return (
    <View style={styles.layout}>
      <Image style={styles.logoIconStyle} source={homeLogo} />
      <Text style={styles.mainText}>{homeMessages.title1}</Text>
      <Text style={styles.mainText}>{homeMessages.title2}</Text>
      <Text style={styles.subText}>{homeMessages.slogan}</Text>
    </View>
  );
};

export default Home;
