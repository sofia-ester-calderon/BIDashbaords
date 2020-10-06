import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PropTypes} from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import KpiViewer from './kpis/KpiViewer';
import data from '../../data/data';
import SubCateogryOverview from './subCategories/SubCategoryOverview';
import DashboardNavigator from './navigator/DashboardNavigator';
import {useUserPermissions} from '../hooks/UserPermissionsProvider';

const ViewerContainer = ({route}) => {
  const [category, setCategory] = useState();
  const [showCategories, setShowCategories] = useState(true);
  const [subCategories, setSubcategories] = useState([]);
  const [kpisOfSubcategory, setKpisOfSubcategory] = useState();
  const [displayKpi, setDisplayKpi] = useState();
  const [token, setToken] = useState();
  const [displayKpiIndex, setDisplayKpiIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [userPermissions, userFunctions] = useUserPermissions();

  useFocusEffect(
    React.useCallback(() => {
      setCategory(route.params.category);
      setShowCategories(true);

      return () => {
        // Do something when the screen is unfocused
      };
    }, []),
  );

  useEffect(() => {
    if (category) {
      setSubcategories(data.getSubcategories(category));
    }
  }, [category]);

  useEffect(() => {
    if (displayKpi) {
      setToken(data.getTokenOfKpi(displayKpi.id, userPermissions.companyID));
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
    const dashboard = subCategory.kpis;
    setKpisOfSubcategory(dashboard);
    setDisplayKpi(dashboard[0]);
    setDisplayKpiIndex(1);
    setShowCategories(false);
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
            textContent="Loading..."
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
            url={userPermissions.url}
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
