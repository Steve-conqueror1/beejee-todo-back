const {
  model,
  Schema,
} = require('mongoose');

const { CREATED } = require('../constants');

const schema = new Schema({
  text: { type: String, unique: true, required: true },
  status: { type: Array, default: [CREATED] },
  email: { type: String,  unique:true, required: true },
  username: { type: String, unique:  true , required: true },
});

module.exports = model('Task', schema);
