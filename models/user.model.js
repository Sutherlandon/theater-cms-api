const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  roles: [String],
  salt: String,
}, {
  collection: 'users',
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
  },

  /**
   * Generate a hashed password
   * @param {String} password
   * @param {Function} callback
   */
  generateHash(password) {
    return new Promise((resolve) => {
      // Generate a salt at level 10 strength
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          return resolve({ hash, salt });
        });
      });
    });
  },

  /**
   * Verify a hashed password
   * @param {String} password
   * @param {String} salt
   * @param {Function} callback
   */
  hashPassword(password, salt) {
    return new Promise((resolve) => {
      bcrypt.hash(password, salt, (err, hash) => {
        return resolve(hash);
      });
    });
  },

}

const User = mongoose.model('User', UserSchema);

module.exports = User;