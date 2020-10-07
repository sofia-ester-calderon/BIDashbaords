/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import database from '@react-native-firebase/database';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';
import CompanyPicker from './CompanyPicker';

const CompaniesContainer = ({navigation}) => {
  const [userPermissions, userFunctions] = useUserPermissions();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    if (userPermissions && userPermissions.companies) {
      getCompaniesOfUser();
    }
  }, [userPermissions]);

  const getCompaniesOfUser = () => {
    const comps = [];
    userPermissions.companies.forEach((company, index) => {
      database()
        .ref(`/companies/${company}`)
        .once('value')
        .then((companySnapshot) => {
          comps.push({...companySnapshot.val(), id: company});
          if (index === userPermissions.companies.length - 1) {
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
    userFunctions.setUserCompany(
      companies.find((company) => company.id === selectedCompany),
    );
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>Please select a company</Text>
      <CompanyPicker
        companies={companies}
        onChange={handleSelectionChanged}
        selectedValue={selectedCompany}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default CompaniesContainer;
