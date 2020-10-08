const jwt = require('jsonwebtoken');
const key = require('./key.json');

function generateToken(question) {
  const payload = {
    resource: {question},
    params: {},
  };
  const token = jwt.sign(payload, key.value);
  console.log(`TOKEN FOR QUESTION ${question}\n${token}\n\n`);
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
