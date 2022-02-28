const genericCrud = require('./generic.controller');
const { Task } = require('../models');

module.exports = {
  ...genericCrud(Task),
    async getAll(req, res) {
    try {
      const data = await Task.find().populate('createdBy', ['email', 'username']).then(items => {
      return items;
      })
      return res.status(200).send(data)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
