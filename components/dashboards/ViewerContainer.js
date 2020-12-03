/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PropTypes} from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import CryptoJS from 'react-native-crypto-js';
import KpiViewer from './kpis/KpiViewer';
import SubCateogryOverview from './subCategories/SubCategoryOverview';
import DashboardNavigator from './navigator/DashboardNavigator';
import {useLanguage} from '../hooks/LanguageProvider';
import {useCompany} from '../hooks/CompanyProvider';
import {useMessages} from '../hooks/MessagesProvider';
import * as firebaseHelper from '../firebase/firebaseHelper';

const key = require('../../token-generator/key.json');

const ViewerContainer = ({route}) => {
  const [categoryIndex, setCategoryIndex] = useState(-1);
  const [showCategories, setShowCategories] = useState(true);
  const [subCategories, setSubcategories] = useState([]);
  const [displaySubcategory, setDisplaySubcategory] = useState([]);
  const [kpisOfSubcategory, setKpisOfSubcategory] = useState();
  const [displayKpi, setDisplayKpi] = useState();
  const [token, setToken] = useState();
  const [displayKpiIndex, setDisplayKpiIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [language] = useLanguage();
  const [company] = useCompany();
  const [messages] = useMessages();

  useFocusEffect(
    React.useCallback(() => {
      setCategoryIndex(route.params.categoryIndex);
      setShowCategories(true);

      return () => {
        // Do something when the screen is unfocused
      };
    }, []),
  );

  useEffect(() => {
    if (categoryIndex > -1) {
      firebaseHelper.getSubcategories(categoryIndex).then((snapshot) => {
        const subCatData = snapshot.map((item, index) => {
          return {
            name: item.name[language],
            description: item.description[language],
            index,
          };
        });
        setSubcategories(subCatData);
      });
    }
  }, [categoryIndex]);

  useEffect(() => {
    if (displayKpi) {
      firebaseHelper
        .getKpiToken(categoryIndex, displaySubcategory, displayKpi.index)
        .then((snapshot) => {
          if (snapshot) {
            const tokenOfCompany = snapshot.find((tokenData) => {
              return tokenData.companyId === company.id;
            });
            const bytes = CryptoJS.AES.decrypt(
              tokenOfCompany.encrToken,
              key.encryptionKey,
            );
            const originalToken = bytes.toString(CryptoJS.enc.Utf8);
            setToken(originalToken);
          }
        });
      showSpinnerForSeconds(2000);
    }
  }, [displayKpi]);

  useEffect(() => {
    if (!showCategories) {
      showSpinnerForSeconds(6000);
    }
  }, [showCategories]);

  const showSpinnerForSeconds = (time) => {
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
    }, time);
  };

  const handleChooseSubCategory = (subCategory) => {
    setDisplaySubcategory(subCategory.index);
    firebaseHelper
      .getKpis(categoryIndex, subCategory.index)
      .then((snapshot) => {
        const kpis = snapshot.map((kpiData, index) => {
          return {
            name: kpiData.name[language],
            description: kpiData.description[language],
            index,
          };
        });
        setKpisOfSubcategory(kpis);
        setDisplayKpi(kpis[0]);
        setDisplayKpiIndex(1);
        setShowCategories(false);
      });
  };

  const handleShowNextKpi = () => {
    const kpis = kpisOfSubcategory;
    const index = kpis.indexOf(displayKpi);
    if (index === kpis.length - 1) {
      setDisplayKpi(kpis[0]);
      setDisplayKpiIndex(1);
      return;
    }
    setDisplayKpi(kpis[index + 1]);
    setDisplayKpiIndex(index + 2);
  };

  const handleShowPrevKpi = () => {
    const kpis = kpisOfSubcategory;
    const index = kpis.indexOf(displayKpi);
    if (index === 0) {
      setDisplayKpi(kpis[kpis.length - 1]);
      setDisplayKpiIndex(kpis.length);
      return;
    }
    setDisplayKpi(kpis[index - 1]);
    setDisplayKpiIndex(index);
  };

  const handleShowSubCategories = () => {
    setShowCategories(true);
  };

  return (
    <>
      {showCategories ? (
        <SubCateogryOverview
          subCategories={subCategories}
          onChooseSubCategory={handleChooseSubCategory}
          texts={messages.subcategoryOverview}
        />
      ) : (
        <>
          <Spinner
            visible={showSpinner}
            textContent={messages.viewerContainer.loading.concat('...')}
            textStyle={{
              color: '#FFF',
            }}
          />
          <DashboardNavigator
            onNext={handleShowNextKpi}
            onPrevious={handleShowPrevKpi}
            onBack={handleShowSubCategories}
            kpiCount={kpisOfSubcategory.length}
            texts={messages.dashboardNavigator}
          />
          {company && (
            <KpiViewer
              kpi={displayKpi}
              token={token}
              count={displayKpiIndex}
              totalCount={kpisOfSubcategory.length}
              url={company.url}
              texts={messages.kpiviewer}
            />
          )}
        </>
      )}
    </>
  );
};

ViewerContainer.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default ViewerContainer;
