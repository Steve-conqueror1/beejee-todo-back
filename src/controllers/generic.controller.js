const boom = require('boom');
const {ADMIN_USER_TYPE} = require("../constants");

const genericApi = (model) => ({
  async get(req, res) {
    const { id } = req.params;
    try {
      const item = await model.findById(id);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async getAll(req, res) {
    try {
      const items = await model.find();
      return res.status(200).send(items)
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async create(req, res) {
    const body = req.body;
    try {
      const item = new model(body);
      const newItem = await item.save();
      return res.status(201).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const body = req.body;
    try {
      if(!req.session.userType){
         return res.status(401).send({unauthorized: "You need to login to perform this action"});
      }
      if(!req.session.userType !== ADMIN_USER_TYPE){
         return res.status(403).send({unauthorized: "You dont have permission to perform this action"});
      }
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await model.findOne({username})

      if(!user){
        return res.status(404).send({username: "No user associated with this username"})
      }

      if(user.username !== username){
        return res.status(409).send({username: "No user associated with this username"})
      }

      if(user.password !== password){
       return  res.status(409).send({password: "Wrong password"})
      }
      req.session.userType = user.userType

      req.session.save( error => {
        if(!error){
           return res.status(200).send({login: "Successfully logged in"});
        }
      })
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async logout(req, res) {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        } else {
            res.send('Successfully logged out')
        }
    });
  },
});

module.exports = genericApi;
