import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import {StyleSheet, Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useLanguage} from '../hooks/LanguageProvider';

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
  const [messages, setMessages] = useState({});
  const [language] = useLanguage();

  useEffect(() => {
    console.log('IN HOME language', language);
    getMessages();
  }, [language]);

  const getMessages = () => {
    database()
      .ref(`/messages/${language}/home`)
      .once('value')
      .then((logoutSnapshot) => {
        console.log('got message', logoutSnapshot.val());
        setMessages(logoutSnapshot.val());
      });
  };

  return (
    <View style={styles.layout}>
      <Image style={styles.logoIconStyle} source={homeLogo} />
      <Text style={styles.mainText}>{messages.title1}</Text>
      <Text style={styles.mainText}>{messages.title2}</Text>
      <Text style={styles.subText}>{messages.slogan}</Text>
    </View>
  );
};

export default Home;
