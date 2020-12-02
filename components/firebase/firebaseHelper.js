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
