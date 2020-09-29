import {it, expect} from '@jest/globals';
import data from './data';

it('should return all categories for role', () => {
  const expectedCategories = [
    'Ventas',
    'Compras',
    'Tesoreria',
    'Contabilidad',
    'Finanzas',
  ];
  const actualCategories = data.getCategories('Administrator');
  expect(actualCategories).toEqual(expectedCategories);
});

it('should return all subcategories for category', () => {
  const expectedSubcategories = [
    'Operaciones Bodega',
    'Operaciones Facturacion',
    'Ventas General',
    'Ventas Acumuladas',
  ];
  const actualSubcategories = data.getSubcategories('Ventas');
  expect(actualSubcategories).toEqual(expectedSubcategories);
});

it('should find a kpi', () => {
  const expectedKpi = [
    {
      id: 33,
      kpi: 'KPI - OdC incompletas de facturacion',
      description: '',
    },
    {
      id: 34,
      kpi: 'KPI - FdC no completadas',
      description: '',
    },
    {
      id: 35,
      kpi: 'KPI - Gastos de retaceo no distribuidos',
      description: '',
    },
    {
      id: 36,
      kpi: 'KPI - OdC no cerradas',
      description: '',
    },
  ];
  const actualKpi = data.getDashboardOfSubCategory(
    'Compras',
    'Operaciones Facturacion',
  );
  expect(actualKpi).toEqual(expectedKpi);
});
