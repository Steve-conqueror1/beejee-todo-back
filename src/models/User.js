const {
  model,
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = require('mongoose');

const { NORMAL_USER_TYPE } = require('../constants');

const schema = new Schema({
  username: { type: String, default: '', unique: [true, 'This username already exists'], required: [true, 'This field is required'] },
  email: { type: String, default: '', unique: [true, 'This email already exists'], required: [true, 'This field is required'] },
  password: { type: String, default: '', minlength: 3, required: true },
  userType: {
    type: String,
    default: NORMAL_USER_TYPE,
    required: [true, 'This field is already required'],
  },
  tasks: [
    {
      type: ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = model('User', schema);
