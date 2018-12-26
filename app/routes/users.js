const express = require('express');
const mongoose = require('mongoose');
const pick = require('lodash.pick');

const tokenAuth = require('../middleware/auth/token-authentication');
const checkEmail = require('../middleware/auth/check-email');
const hash = require('../middleware/auth/hash');
const credentialsAuth = require('../middleware/auth/credentials-authentication');

const bcrypt = require('bcrypt');
const saltRounds = 10;

let router = express.Router();

let User = require('./../models/User');

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json({
        message: 'GET request to the /users',
        count: users.length,
        users: users.map(user => {
          return {
            ...user.toJSON(),
            request: {
              type: 'GET',
              url: `http://localhost:5000/users/${user._id}`
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Unable to fetch any users',
        error: err
      });
    });
});

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        Promise.reject();
      }
      res.status(200).json({
        message: 'GET request to /users/:id',
        user: user
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Unable to get user',
        error: err
      });
    });
});

router.post('/', checkEmail, hash, (req, res, next) => {
  if (req.body.emailExist) {
    return res.status(409).json({
      message: `Email already exist`
    });
  }

  let user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...pick(req.body, [
      'email',
      'username',
      'password',
      'firstName',
      'lastName',
      'role'
    ])
  });

  user
    .save()
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      return user.generateAuthToken();
    })
    .then(result => {
      res
        .status(201)
        .header('Authorization', result.token)
        .json({
          message: 'Success creating new user!',
          user: result.user
        });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to create new user',
        error: err
      });
    });
});

router.patch('/:userId', tokenAuth, async (req, res, next) => {
  let props = pick(req.body, [
    'username',
    'password',
    'email',
    'role',
    'firstName',
    'lastName'
  ]);
  if (props.password) {
    props.password = await bcrypt.hash(req.body.password, saltRounds);
  }
  props.updatedAt = Date.now();
  let query = req.params.userId;

  User.findByIdAndUpdate(query, { $set: props }, { new: true })
    .then(user => {
      res.status(200).json({
        message: 'User successfully updated!',
        user: user
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Unable to update user',
        error: err
      });
    });
});

router.post('/login', credentialsAuth, async (req, res, next) => {
  if (!req.body.token) {
    return res.status(401).json({
      message: 'Authentication failed!'
    });
  }
  res
    .status(200)
    .header('Authorization', req.body.token)
    .json({
      message: 'Authentication succeed!'
    });
});

router.post('/logout', tokenAuth, (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      message: "Can't handle request"
    });
  }

  req.user
    .removeToken(req.token)
    .then(user => {
      res.status(200).json({
        message: 'Yeay! Deleted...',
        user: user
      });
    })
    .catch(err => {
      res.status(401).json({
        message: "Can't handle request",
        error: err
      });
    });
});

router.delete('/:userId', (req, res, next) => {
  let query = req.params.userId;

  User.findByIdAndDelete(query)
    .then(user => {
      res.status(200).json({
        message: 'Successfully deleting user',
        user: user
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to delete user',
        error: err
      });
    });
});

module.exports = router;
