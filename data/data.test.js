import data from './data';

it('should return all categories', () => {
  const expectedCategories = ['Ventas', 'Compras', 'Tesoreria', 'Contabilidad', 'Finanzas'];
  const actualCategories = data.getCategories();
  expect(actualCategories).toEqual(expectedCategories);
});

it('should return all subcategories for cateogry', () => {
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
  const expectedKpi = {
    category: 'Compras',
    subcategory: 'Operaciones Facturacion',
    access: ['Administrator', 'Gerencia', 'Compras'],
    kpis: [
      {
        kpi: 'KPI - OdC incompletas de facturacion',
        METABASE_SITE_URL: 'http://10.8.2.1:3000',
        METABASE_SECRET_KEY: 'xxxxx',
      },
      {
        kpi: 'KPI - FdC no completadas',
        METABASE_SITE_URL: 'http://10.8.2.1:3000',
        METABASE_SECRET_KEY: 'xxxxx',
      },
      {
        kpi: 'KPI - Gastos de retaceo no distribuidos',
        METABASE_SITE_URL: 'http://10.8.2.1:3000',
        METABASE_SECRET_KEY: 'xxxxx',
      },
      {
        kpi: 'KPI - OdC no cerradas',
        METABASE_SITE_URL: 'http://10.8.2.1:3000',
        METABASE_SECRET_KEY: 'xxxxx',
      },
    ],
  };
  const actualKpi = data.getKpiOfSubCategory('Compras', 'Operaciones Facturacion');
  expect(actualKpi).toEqual(expectedKpi);
});
