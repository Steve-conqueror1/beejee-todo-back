const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const { NORMAL_USER_TYPE } = require('../constants');

const schema = new Schema({
  username: { type: String, default: '', unique: true, required: true },
  email: { type: String, default: '', unique: true, required: true },
  password: { type: String, default: '', minlength: 3, required: true },
  userType: {
    type: String,
    default: NORMAL_USER_TYPE,
    required: true,
  },
  tasks: [
    {
      type: ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = model('User', schema);
