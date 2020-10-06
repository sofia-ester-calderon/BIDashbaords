const dashboards = require('./dashboards.json');
const tokens = require('./tokens.json');

const getCategories = (role) => {
  return dashboards
    .filter((dashboard) => dashboard.access.includes(role))
    .map((dashboard) => dashboard.name);
};

const getSubcategories = (category) => {
  const cat = dashboards.find((dashboard) => dashboard.name === category);
  return cat.subcategories;
};

const getDashboardOfSubCategory = (category, subCategory) => {
  const cat = dashboards.find((dashboard) => dashboard.name === category);
  const wantedSubcat = cat.subcategories.find(
    (subcat) => subcat.name === subCategory,
  );
  return wantedSubcat.kpis;
};

const getTokenOfKpi = (id, companyID) => {
  const {token} = tokens
    .find((t) => t.id === id)
    .companies.find((company) => company.companyID === companyID);
  return token;
};

const data = {
  getCategories,
  getSubcategories,
  getDashboardOfSubCategory,
  getTokenOfKpi,
};

export default data;
