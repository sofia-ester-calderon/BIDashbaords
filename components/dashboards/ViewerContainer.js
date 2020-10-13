/* eslint-disable no-use-before-define */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PropTypes} from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import database from '@react-native-firebase/database';
import KpiViewer from './kpis/KpiViewer';
import SubCateogryOverview from './subCategories/SubCategoryOverview';
import DashboardNavigator from './navigator/DashboardNavigator';
import {useLanguage} from '../hooks/LanguageProvider';
import {useCompany} from '../hooks/CompanyProvider';
import {useMessages} from '../hooks/MessagesProvider';

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
  console.log('ViewerContainer. language:', language, 'messages:', messages);

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  console.log(
    'ViewerContainer. Auswertung von : "language && !isEmptyObject(messages)"',
    language && !isEmptyObject(messages) ? true : false,
    'language: ',
    language,
    'isEmptyObject(messages)',
    isEmptyObject(messages),
  );
  const viewerMessages =
    language && !isEmptyObject(messages)
      ? messages[language].viewerContainer
      : '';
  console.log('ViewerContainer. viewerMessages: ', viewerMessages);

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
      database()
        .ref(`/categories/${categoryIndex}/subcategories`)
        .once('value')
        .then((categoriesSnapshot) => {
          const subCatData = categoriesSnapshot.val().map((item, index) => {
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
      database()
        .ref(
          `/categories/${categoryIndex}/subcategories/${displaySubcategory}/kpis/${displayKpi.index}/tokens`,
        )
        .once('value')
        .then((tokenSnapshot) => {
          if (tokenSnapshot.val()) {
            const tokenOfCompany = tokenSnapshot.val().find((tokenData) => {
              return tokenData.companyId === company.id;
            });
            setToken(tokenOfCompany.token);
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
    database()
      .ref(
        `/categories/${categoryIndex}/subcategories/${subCategory.index}/kpis`,
      )
      .once('value')
      .then((kpisSnapshot) => {
        const kpis = kpisSnapshot.val().map((kpiData, index) => {
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
        />
      ) : (
        <>
          <Spinner
            visible={showSpinner}
            textContent={viewerMessages.loading.concat('...')}
            textStyle={{
              color: '#FFF',
            }}
          />
          <DashboardNavigator
            onNext={handleShowNextKpi}
            onPrevious={handleShowPrevKpi}
            onBack={handleShowSubCategories}
            kpiCount={kpisOfSubcategory.length}
          />
          <KpiViewer
            kpi={displayKpi}
            token={token}
            count={displayKpiIndex}
            totalCount={kpisOfSubcategory.length}
            url={company.url}
          />
        </>
      )}
    </>
  );
};

ViewerContainer.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default ViewerContainer;
