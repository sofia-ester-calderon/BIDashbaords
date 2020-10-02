const dashboards = require('./dashboards.json');
const users = require('./users.json');
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

const getTokenOfKpi = (id) => {
  const token = tokens.find((t) => t.id === id);
  return token.token;
};

const getLoginUser = (username, password, company) => {
  const existingUser = users.find(
    (user) =>
      user.username === username &&
      user.password === password &&
      user.companies.includes(company),
  );
  if (existingUser) {
    return {...existingUser, company: company};
  }
};

const data = {
  getCategories,
  getSubcategories,
  getDashboardOfSubCategory,
  getLoginUser,
  getTokenOfKpi,
};

export default data;
