const mongoose = require('mongoose');
const crypto = require('crypto');

const userScheama = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
      default: 'Üye'
    },
    picture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    totalrating: {
      type: Number,
      default: "0",
    },
    voters: {
      type: Array,
      default: [],
    },
    report1: {
      type: Array,
      default: [],
    },
    report2: {
      type: Array,
      default: [],
    },
    resetPasswordLink: {
      data: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);


userScheama
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });


userScheama.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports = mongoose.model('User', userScheama); 