/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import CompanyPicker from './CompanyPicker';
import {useLanguage} from '../hooks/LanguageProvider';
import {useCompany} from '../hooks/CompanyProvider';
import {useMessages} from '../hooks/MessagesProvider';
import * as firebaseHelper from '../firebase/firebaseHelper';

const CompaniesContainer = ({navigation}) => {
  const [userPermissions] = useUserPermissions();
  const [language, setLanguage] = useLanguage('en');
  const [company, setCompany] = useCompany();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [messages, setMessages] = useMessages();

  useEffect(() => {
    if (userPermissions && userPermissions.companies) {
      setCompanies([]);
      getCompaniesOfUser();
    }
  }, [userPermissions.companies]);

  useEffect(() => {
    firebaseHelper.getMessages(language).then((message) => {
      setMessages(message);
    });
  }, [language]);

  const getCompaniesOfUser = async () => {
    const comps = [];
    userPermissions.companies.forEach((companyId, index) => {
      firebaseHelper.getCompany(companyId).then((comp) => {
        comps.push({...comp, id: companyId});
        if (index === 0) {
          setLanguage(comp.language);
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
  };

  const handleSelectionChanged = (value) => {
    setSelectedCompany(value);
  };

  const handleSelect = () => {
    const selectedComp = companies.find((comp) => comp.id === selectedCompany);
    setCompany(selectedComp);
    setLanguage(selectedComp.language);
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
