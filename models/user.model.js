const mongoose = require('mongoose');

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
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User;