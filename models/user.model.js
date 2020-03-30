// const Joi = require('joi');
// const util = require('util');
// const db = require('../utils/database');

// let Users = db.getCollection('users')

// // define the schema for User object
// Users.schema = Joi.object().keys({
//   username: Joi.string().required(),
//   password: Joi.string().required(),
// });

// validates a User object with a promise
//Users.validate = util.promisify(Users.schema.validate);

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  roles: [String],
  salt: String,
})

UserSchema.statics = {
  get(id) {
    if (id) {
      return this.find({ _id: id })
        .lean()
        .exec();
    }

    return this.find()
      .lean()
      .exec();
  },
  add(user) {
    return this.save(user, { new: true })
      .exec()
      .then(() => this.get()) 
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;