const dashboards = require('./dashboards.json');
const users = require('./users.json');

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
  const wantedSubcat = cat.subcategories.find(
    (subcat) => subcat.name === subCategory,
  );
  return wantedSubcat.kpis;
};

const loginUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password,
  );
};

const data = {
  getCategories,
  getSubcategories,
  getDashboardOfSubCategory,
  loginUser,
};

export default data;
