/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import database from '@react-native-firebase/database';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import CompanyPicker from './CompanyPicker';
import {useLanguage} from '../hooks/LanguageProvider';
import {useMessages} from '../hooks/MessagesProvider';

const CompaniesContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [language, setLanguage] = useLanguage();
  const [messages, setMessages, setAllMessages] = useMessages();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    if (userPermissions && userPermissions.companies) {
      setCompanies([]);
      getCompaniesOfUser();
      getMessages();
      console.log(
        'CompaniesContainer, User effect: Messages geladen!!!!. Messages: ',
      );
      console.log(messages);
    }
  }, [userPermissions.companies]);

  const getCompaniesOfUser = () => {
    const comps = [];
    userPermissions.companies.forEach((company, index) => {
      database()
        .ref(`/companies/${company}`)
        .once('value')
        .then((companySnapshot) => {
          comps.push({...companySnapshot.val(), id: company});
          if (index === 0) {
            setLanguage(companySnapshot.val().language);
          }
          if (index === userPermissions.companies.length - 1) {
            if (comps.length === 1) {
              setLanguage(comps[0].language);
              userFunctions.setUserCompany(comps[0]);
              navigation.navigate('Home');
              return;
            }
            setCompanies(comps);
            if (userPermissions.company) {
              setSelectedCompany(userPermissions.company.id);
            } else {
              setSelectedCompany(comps[0].id);
            }
          }
        });
    });
  };

  const getMessages = () => {
    console.log('CompaniesContainer, getMessages() Start ');
    database()
      .ref(`/messages`)
      .once('value')
      .then((logoutSnapshot) => {
        setMessages(logoutSnapshot.val());
        setAllMessages(logoutSnapshot.val());
      });
    console.log('CompaniesContainer, getMessages() End ');
  };

  const handleSelectionChanged = (value) => {
    console.log(
      'CompaniesContainer, handleSelectionChanged() Start, Value: ',
      value,
    );
    setSelectedCompany(value);
    console.log('CompaniesContainer, handleSelectionChanged() End ');
  };

  const handleSelect = () => {
    const selectedComp = companies.find(
      (company) => company.id === selectedCompany,
    );
    userFunctions.setUserCompany(selectedComp);
    setLanguage(selectedComp.language);
    if (selectedComp.language) {
      console.log(
        'CompaniesContainer, handleSelect(): Sprache wird gesetzt!!!! Language: ',
        selectedComp.language,
      );
      setMessages(messages[selectedComp.language]);
    } else {
      console.log(
        'CompaniesContainer, handleSelect(): (keine Sprache) auf Default-Messages umstellen ?',
      );
    }
    console.log(
      'CompaniesContainer, handleSelect: Messages mit Uebersetzung gesetzt!!!! Language: ',
      selectedComp.language,
      ', Company: ',
      selectedComp,
    );
    console.log(
      'CompaniesContainer, handleSelect: Messages mit Uebersetzung gesetzt!!!! Messages ',
      messages,
    );
    navigation.navigate('Home');
  };

  return (
    <View>
      {companies.length > 0 && (
        <>
          <CompanyPicker
            companies={companies}
            onChange={handleSelectionChanged}
            selectedValue={selectedCompany}
            onSelect={handleSelect}
          />
        </>
      )}
    </View>
  );
};

export default CompaniesContainer;
