const { Schema, model } = require('mongoose');
const Institute = require('./InstituteSchema');

const signUpSchema = Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  instituteCode: { type: String, require: true },
});
const UserSignUp = model('StudentSignUp', signUpSchema);

module.exports = UserSignUp;
