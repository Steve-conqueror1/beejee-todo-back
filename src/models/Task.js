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
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: [true, "Task creator is required"]
  },
});

module.exports = model('Task', schema);
