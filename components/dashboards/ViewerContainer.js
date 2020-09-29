import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PropTypes} from 'prop-types';
import KpiViewer from './kpis/KpiViewer';
import data from '../../data/data';
import SubCateogryOverview from './subCategories/SubCategoryOverview';
import DashboardNavigator from './navigator/DashboardNavigator';

const ViewerContainer = ({route}) => {
  const [category, setCategory] = useState();
  const [showCategories, setShowCategories] = useState(true);
  const [subCategories, setSubcategories] = useState([]);
  const [kpisOfSubcategory, setKpisOfSubcategory] = useState();
  const [displayKpi, setDisplayKpi] = useState();

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
    setSubcategories(data.getSubcategories(category));
  }, [category]);

  const handleChooseSubCategory = (subCategory) => {
    const dashboard = data.getDashboardOfSubCategory(category, subCategory);
    setKpisOfSubcategory(dashboard);
    setDisplayKpi(dashboard.kpis[0]);
    setShowCategories(false);
  };

  const handleShowNextKpi = () => {
    const {kpis} = kpisOfSubcategory;
    const index = kpis.indexOf(displayKpi);
    if (index === kpis.length - 1) {
      setDisplayKpi(kpis[0]);
      return;
    }
    setDisplayKpi(kpis[index + 1]);
  };

  const handleShowPrevKpi = () => {
    const {kpis} = kpisOfSubcategory;
    const index = kpis.indexOf(displayKpi);
    if (index === 0) {
      setDisplayKpi(kpis[kpis.length - 1]);
      return;
    }
    setDisplayKpi(kpis[index - 1]);
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
          <DashboardNavigator
            onNext={handleShowNextKpi}
            onPrevious={handleShowPrevKpi}
            onBack={handleShowSubCategories}
            kpiCount={kpisOfSubcategory.kpis.length}
          />
          <KpiViewer kpi={displayKpi} />
        </>
      )}
    </>
  );
};

ViewerContainer.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default ViewerContainer;
