/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import database from '@react-native-firebase/database';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import CompanyPicker from './CompanyPicker';
import {useLanguage} from '../hooks/LanguageProvider';
import {useCompany} from '../hooks/CompanyProvider';
import {useMessages} from '../hooks/MessagesProvider';

const CompaniesContainer = ({navigation}) => {
  const [userPermissions] = useUserPermissions();
  const [language, setLanguage] = useLanguage();
  const [company, setCompany] = useCompany();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [messages, setMessages] = useMessages();

  console.log('im CompaniesContainer init!!');

  useEffect(() => {
    console.log('im CompaniesContainer start von useFocusEffect()');
    if (userPermissions && userPermissions.companies) {
      setCompanies([]);
      getCompaniesOfUser();
      getMessages();
    }
    console.log('im CompaniesContainer ende von useFocusEffect()');
  }, [userPermissions.companies]);

  const getCompaniesOfUser = () => {
    console.log('im CompaniesContainer start von getCompaniesOfUser()');
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
              setCompany(comps[0]);
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
    console.log('im CompaniesContainer ende von getCompaniesOfUser()');
  };

  const getMessages = () => {
    console.log('CompaniesContainer, getMessages() Start ');
    database()
      .ref(`/messages`)
      .once('value')
      .then((messagesSnapshot) => {
        setMessages(messagesSnapshot.val());
      });
    console.log('CompaniesContainer, getMessages() End ');
  };

  const handleSelectionChanged = (value) => {
    console.log('im CompaniesContainer start von handleSelectionChanged()');
    setSelectedCompany(value);
    console.log('im CompaniesContainer ende von handleSelectionChanged()');
  };

  const handleSelect = () => {
    const selectedComp = companies.find((comp) => comp.id === selectedCompany);
    setCompany(selectedComp);
    setLanguage(selectedComp.language);
    navigation.navigate('Home');
    console.log('im CompaniesContainer ende von handleSelect()');
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
