/* eslint-disable prettier/prettier */
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export async function getCategories() {
  return database()
    .ref(`/categories`)
    .once('value')
    .then((categoriesSnapshot) => {
      return categoriesSnapshot.val();
    });
}

export async function getCompany(companyId) {
  return database()
    .ref(`/companies/${companyId}`)
    .once('value')
    .then((companySnapshot) => {
      return companySnapshot.val();
    });
}

export async function getMessages(language) {
  return database()
    .ref(`/messages/${language}`)
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

export async function getUser(userId) {
  return database()
    .ref(`/users/${userId}`)
    .once('value')
    .then((userSnapshot) => {
      return userSnapshot.val();
    });
}

export function subscribeToAuth(authChangeFunction) {
  return auth().onAuthStateChanged(authChangeFunction);
}

export async function loginUser(username, password) {
  return auth()
    .signInWithEmailAndPassword(username, password)
    .then(() => {})
    .catch((error) => {
      return error.code;
    });
}

export function logoutUser() {
  auth()
    .signOut()
    .then(() => {
      console.log('logged out of firebase');
    });
}
