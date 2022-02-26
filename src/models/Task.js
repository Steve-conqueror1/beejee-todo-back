const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const { CREATED } = require('../constants');

const schema = new Schema({
  text: { type: String, default: '' },
  status: { type: Array, default: [CREATED] },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = model('Task', schema);
