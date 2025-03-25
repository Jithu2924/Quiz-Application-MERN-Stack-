const { Schema, model } = require('mongoose');

const instituteSchema = Schema({
  instituteName: { type: String, require: true },
  instituteCode: { type: String, require: true },
});
const Institute = model('institute', instituteSchema);

module.exports = Institute;
