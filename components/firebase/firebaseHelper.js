/* eslint-disable prettier/prettier */
import database from '@react-native-firebase/database';

export async function getCompany(companyId) {
  return database()
    .ref(`/companies/${companyId}`)
    .once('value')
    .then((companySnapshot) => {
      return companySnapshot.val();
    });
}

// TODO: getMessages for only that languge
export async function getMessages() {
  return database()
    .ref(`/messages`)
    .once('value')
    .then((messagesSnapshot) => {
      return messagesSnapshot.val();
    });
}

export async function getSubcategories(category) {
  return database()
    .ref(`/categories/${category}/subcategories`)
    .once('value')
    .then((categoriesSnapshot) => {
      return categoriesSnapshot.val();
    });
}

export async function getKpis(category, subcategory) {
  return database()
    .ref(`/categories/${category}/subcategories/${subcategory}/kpis`)
    .once('value')
    .then((kpisSnapshot) => {
      return kpisSnapshot.val();
    });
}

export async function getKpiToken(category, subcategory, kpi) {
  return database()
    .ref(
      `/categories/${category}/subcategories/${subcategory}/kpis/${kpi}/tokens`,
    )
    .once('value')
    .then((tokenSnapshot) => {
      return tokenSnapshot.val();
    });
}
