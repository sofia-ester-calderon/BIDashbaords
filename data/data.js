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
  return cat.subcategories.map((subCategory) => subCategory.name);
};

const getDashboardOfSubCategory = (category, subCategory) => {
  const cat = dashboards.find((dashboard) => dashboard.name === category);
  const wantedSubcat = cat.subcategories.find((subcat) => subcat.name === subCategory);
  return wantedSubcat.kpis;
};

const getTokenOfKpi = (id) => {
  const token = tokens.find((t) => t.id === id);
  return token.token;
};

const loginUser = (username, password) => {
  return users.find((user) => user.username === username && user.password === password);
};

const data = {
  getCategories,
  getSubcategories,
  getDashboardOfSubCategory,
  loginUser,
  getTokenOfKpi,
};

export default data;
