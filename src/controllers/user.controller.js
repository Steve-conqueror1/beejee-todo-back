const genericCrud = require('./generic.controller');
const { User } = require('../models');

module.exports = {
  ...genericCrud(User),
};
