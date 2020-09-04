/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {Button} from 'react-native';
import {PropTypes} from 'prop-types';

const SubCateogryOverview = ({subCategories, onChooseSubCategory}) => {
  return (
    <>
      {subCategories.map((subCategory) => (
        <Button
          key={subCategory}
          title={subCategory}
          onPress={() => onChooseSubCategory(subCategory)}
        />
      ))}
    </>
  );
};

SubCateogryOverview.propTypes = {
  subCategories: PropTypes.array.isRequired,
  onChooseSubCategory: PropTypes.func.isRequired,
};

export default SubCateogryOverview;
