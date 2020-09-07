/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {it, jest, describe, expect} from '@jest/globals';
import {NavigationContext} from '@react-navigation/native';
import ViewerContainer from './ViewerContainer';

// fake NavigationContext value data
const navContext = {
  isFocused: () => true,
  // addListener returns an unscubscribe function.
  addListener: jest.fn(() => jest.fn()),
};

const routeParam = 'Ventas';

function renderViewerContainer(args) {
  const defaultProps = {
    route: {params: {category: routeParam}},
  };
  const props = {...defaultProps, ...args};
  return render(
    <NavigationContext.Provider value={navContext}>
      <ViewerContainer {...props} />
    </NavigationContext.Provider>
  );
}

describe('given the view is initialized', () => {
  it('should render all subcategories of the route category', () => {
    const {getByText} = renderViewerContainer();

    getByText('Operaciones Bodega');
    getByText('Operaciones Facturacion');
    getByText('Ventas General');
    getByText('Ventas Acumuladas');
  });
});

describe('given a subcategory is chosen', () => {
  it('should render the dashboard navigator', () => {
    const {getByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));

    getByText('Previous');
    getByText('Next');
    getByText('Back to Subcategories');
  });

  it('should render the first kpi of that subcategory', () => {
    const {getByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));

    getByText('KPI - Entregas completadas');
    getByText('Metabase url: http://10.8.2.1:3000');
  });

  it('should not render the subcategories', () => {
    const {getByText, queryByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));

    expect(queryByText('Operaciones Bodega')).toBeFalsy();
  });
});

describe('given the dashboard navigator is used', () => {
  it('should show next kpi when Next is pressed', () => {
    const {getByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));
    fireEvent.press(getByText('Next'));

    getByText('KPI - Entregas no completadas');
  });
  it('should show show the first kpi when Next is pressed on the last kpi', () => {
    const {getByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));
    fireEvent.press(getByText('Next'));

    getByText('KPI - Entregas completadas');
  });
  it('should show the last kpi when Previous is pressed on the first kpi', () => {
    const {getByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));
    fireEvent.press(getByText('Previous'));

    getByText('KPI - Traslados no completados');
  });
  it('should show the previous kpi when Previous is pressed', () => {
    const {getByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));
    fireEvent.press(getByText('Previous'));
    fireEvent.press(getByText('Previous'));

    getByText('OdA no entregadas');
  });
  it('should show the subcategories Back to Subcategories is pressed', async () => {
    const {getByText, queryByText} = renderViewerContainer();
    fireEvent.press(getByText('Operaciones Bodega'));
    fireEvent.press(getByText('Back to Subcategories'));

    expect(queryByText('KPI - Entregas completadas')).toBeFalsy();
    getByText('Operaciones Bodega');
  });
});
