const kpis = require('./kpis.json');
const users = require('./users.json');

const getCategories = (role) => {
  const set = new Set();
  kpis.forEach((kpi) => {
    if (kpi.access.includes(role)) {
      set.add(kpi.category);
    }
  });
  return Array.from(set);
};

const getSubcategories = (category) => {
  return kpis
    .filter((kpi) => kpi.category === category)
    .map((kpi) => kpi.subcategory);
};

const getKpiOfSubCategory = (category, subCategory) => {
  return kpis.find(
    (kpi) => kpi.category === category && kpi.subcategory === subCategory,
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
  getKpiOfSubCategory,
  loginUser,
};

export default data;
