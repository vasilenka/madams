const express = require('express');
const mongoose = require('mongoose');
const pick = require('lodash.pick');

const tokenAuth = require('../middleware/auth/token-authentication');
const checkEmail = require('../middleware/auth/check-email');
const hash = require('../middleware/auth/hash');

const bcrypt = require('bcrypt');
const saltRounds = 10;

let router = express.Router();

let User = require('./../models/User');

router.get('/', tokenAuth, (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json({
        message: 'Success',
        users : users
      });
      // res.status(200).json({
      //   message: 'GET request to the /users',
      //   count: users.length,
      //   users: users.map(user => {
      //     return {
      //       ...user.toJSON(),
      //       request: {
      //         type: 'GET',
      //         url: `http://localhost:5000/users/${user._id}`
      //       }
      //     };
      //   })
      // });
    })
    .catch(err => {
      res.status(500).send({
        message: 'Unable to fetch any users',
        error: err
      });
    });
});

router.get('/:userId', tokenAuth, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        Promise.reject();
      }
      res.status(200).json({
        message: 'Success',
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

router.post('/', tokenAuth, checkEmail, hash, (req, res, next) => {
  if (req.body.emailExist) {
    return res.status(409).json({
      message: `User already exist`
    });
  }

  let user = new User({
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
      req.body.token = user.generateToken();
      return user//.generateAuthToken();
    })
    .then(user => {
      res
        .status(201)
        // .header('Authorization', result.token)
        .json({
          message: 'Success creating new user!',
          token: req.body.token,
          user: user
        });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to create new user',
        error: err
      });
    });
});

router.put('/:userId', tokenAuth, async (req, res, next) => {

  if(req.currentUser.id !== req.params.userId) {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }

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
  // props.updatedAt = Date.now();
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

router.delete('/:userId', tokenAuth, (req, res, next) => {

  if(req.currentUser.id !== req.params.userId) {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }

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
