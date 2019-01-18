const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const pick = require('lodash.pick');

let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: props => '{VALUE} is not a valid email'
    }
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    minlength: [6, 'Password minimum length is 6 characters'],
    trim: true,
    required: true,
    type: String
  },
  firstName: {
    type: String,
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true
  },
  tokens: [
    {
      access: {
        type: String,
        lowercase: true,
        trim: true
      },
      token: {
        type: String
      }
    }
  ],
  role: [
    {
      type: String,
      trim: true
    }
  ],
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now
  // }
});

userSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return pick(userObject, [
    '_id',
    'email',
    'username',
    'firstName',
    'lastName',
    'role',
    'createdAt',
    'updatedAt'
  ]);
};

userSchema.methods.removeToken = function(token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

userSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';

  let token = jwt.sign(
    {
      _id: user._id.toHexString(),
      access,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_SAUCE
  );

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(user => {
    return { user, token };
  });
};

userSchema.methods.isTokenExist = function() {
  let user = this;

  let existingToken = user.tokens.filter(
    token =>
      jwt.verify(token.token, process.env.SECRET_SAUCE) &&
      token.access === 'auth'
  );

  if (existingToken.length > 0) {
    user.tokenExist = true;
  }

  return user;
};

userSchema.methods.generateToken = function() {
  let user = this;
  let access = 'auth';

  let token = jwt.sign(
    {
      id: user.id,
      access,
      email: user.email,
      username: user.username
    },
    process.env.SECRET_SAUCE
  );

  return token;
};

userSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_SAUCE);
  } catch (err) {
    return Promise.reject();
  }

  return User.findById(decoded.id);
};

module.exports = mongoose.model('User', userSchema);
