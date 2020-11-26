const jwt = require('jsonwebtoken');
const CryptoJS = require('react-native-crypto-js');
const key = require('./key.json');

function generateToken(question) {
  const payload = {
    resource: {question},
    params: {},
  };
  const token = jwt.sign(payload, key.tokenKey);
  console.log(`\nQUESTION ${question}\n\n`);

  console.log(`(Actual token: ${token})\n`);

  const ciphertext = CryptoJS.AES.encrypt(token, key.encryptionKey).toString();
  console.log(`ENCRYPTED TOKEN - STORE THIS IN FIREBASE\n${ciphertext}\n\n`);
}

const question1 = parseInt(process.argv[2]);
const question2 = parseInt(process.argv[3]);

if (!question2) {
  generateToken(question1);
} else {
  for (let question = question1; question <= question2; question++) {
    generateToken(question);
  }
}
