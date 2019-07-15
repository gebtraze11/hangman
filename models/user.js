const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  wins: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: String
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb)
};

module.exports = mongoose.model('User', userSchema);