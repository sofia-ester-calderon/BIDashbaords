const dashboards = require('./dashboards.json');
const users = require('./users.json');

const getCategories = (role) => {
  const set = new Set();
  dashboards.forEach((dashboard) => {
    if (dashboard.access.includes(role)) {
      set.add(dashboard.category);
    }
  });
  return Array.from(set);
};

const getSubcategories = (category) => {
  return dashboards
    .filter((dashboard) => dashboard.category === category)
    .map((dashboard) => dashboard.subcategory);
};

const getDashboardOfSubCategory = (category, subCategory) => {
  return dashboards.find(
    (dashboard) =>
      dashboard.category === category && dashboard.subcategory === subCategory,
  );
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
