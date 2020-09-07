/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {render} from '@testing-library/react-native';
import {it, jest} from '@jest/globals';
import SubCateogryOverview from './SubCategoryOverview';

const subCategories = ['Subcategory1', 'Subcategory2'];
const onChooseSubCategory = jest.fn();

function renderSubcategoryOverview(args) {
  const defaultProps = {
    subCategories,
    onChooseSubCategory,
  };
  const props = {...defaultProps, ...args};
  return render(<SubCateogryOverview {...props} />);
}

it('should render all subcategories as button', () => {
  const {getByText} = renderSubcategoryOverview();
  getByText('Subcategory1');
  getByText('Subcategory2');
});
