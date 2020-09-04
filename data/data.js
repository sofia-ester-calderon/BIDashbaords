const kpis = require('./kpis.json');

const getCategories = () => {
  const set = new Set();
  kpis.forEach((kpi) => set.add(kpi.category));
  return Array.from(set);
};

const getSubcategories = (category) => {
  return kpis.filter((kpi) => kpi.category === category).map((kpi) => kpi.subcategory);
};

const getKpiOfSubCategory = (category, subCategory) => {
  return kpis.find((kpi) => kpi.category === category && kpi.subcategory === subCategory);
};

const data = {getCategories, getSubcategories, getKpiOfSubCategory};

export default data;
