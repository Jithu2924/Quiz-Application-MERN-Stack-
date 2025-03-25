const { Schema, model } = require('mongoose');

const categorySchema = Schema({
  category: { type: String, require: true },
  instituteCode: { type: String, require: true },
});
const category = model('categories', categorySchema);

module.exports = category;
