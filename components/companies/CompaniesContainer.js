/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import database from '@react-native-firebase/database';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import CompanyPicker from './CompanyPicker';

const CompaniesContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();

  console.log('im CompaniesContainer init!!');

  useEffect(() => {
    console.log('im CompaniesContainer start von useFocusEffect()');
    if (userPermissions && userPermissions.companies) {
      if (!haveCompaniesChanged(userPermissions.companies)) {
        setCompanies([]);
        getCompaniesOfUser();
      }
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
            userFunctions.setLanguage(companySnapshot.val().language);
          }
          if (index === userPermissions.companies.length - 1) {
            if (comps.length === 1) {
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
    console.log('im CompaniesContainer ende von getCompaniesOfUser()');
  };

  const haveCompaniesChanged = (companyNames) => {
    console.log('im CompaniesContainer start von haveCompaniesChanged()');
    const savedCompanyNames = companies.map((company) => company.id);
    console.log('im CompaniesContainer ende von haveCompaniesChanged()');
    return savedCompanyNames === companyNames;
  };

  const handleSelectionChanged = (value) => {
    console.log('im CompaniesContainer start von handleSelectionChanged()');
    setSelectedCompany(value);
    console.log('im CompaniesContainer ende von handleSelectionChanged()');
  };

  const handleSelect = () => {
    console.log('im CompaniesContainer start von handleSelect()');
    userFunctions.setUserCompany(
      companies.find((company) => company.id === selectedCompany),
    );
    console.log('im CompaniesContainer vor navigate(home)');
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
