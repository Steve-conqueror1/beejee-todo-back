const genericCrud = require('./generic.controller');
const { Task } = require('../models');

module.exports = {
  ...genericCrud(Task),
};
