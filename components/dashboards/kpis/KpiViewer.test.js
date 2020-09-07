/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {render} from '@testing-library/react-native';
import {it} from '@jest/globals';
import KpiViewer from './KpiViewer';

const kpi = {
  kpi: 'kpi1',
  METABASE_SITE_URL: 'metabaseurl',
  METABASE_SECRET_KEY: 'xxxxx',
};

function renderKpiViewer(args) {
  const defaultProps = {
    kpi,
  };
  const props = {...defaultProps, ...args};
  return render(<KpiViewer {...props} />);
}

it('should render the kpi', () => {
  const {getByText} = renderKpiViewer();
  getByText('kpi1');
  getByText('Metabase url: metabaseurl');
});
