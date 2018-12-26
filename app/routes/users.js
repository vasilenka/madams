const express = require('express');
const mongoose = require('mongoose');
const pick = require('lodash.pick');

const compare = require('./../middleware/auth-compare');
const authenticate = require('./../middleware/authenticate');

const bcrypt = require('bcrypt');
const saltRounds = 10;

let router = express.Router();

let User = require('./../models/User');

router.get('/', (req, res, next) => {
  User.find()
    .select('_id username email firstName lastName createdAt updatedAt')
    .then(users => {
      res.status(200).json({
        message: 'GET request to the /users',
        count: users.length,
        users: users.map((user, index) => {
          return {
            ...pick(user, [
              '_id',
              'username',
              'email',
              'firstName',
              'lastName',
              'createdAt',
              'updatedAt'
            ]),
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
    .select('_id username email firstName lastName createdAt updatedAt')
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

router.post('/', (req, res, next) => {
  let query = { email: req.body.email };
  User.findOne(query)
    .then(user => {
      if (user) {
        Promise.reject();
      }
      return bcrypt.hash(req.body.password, saltRounds);
    })
    .then(hashed => {
      let user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hashed,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });
      return user.save();
    })
    .then(user => {
      if (!user) {
        Promise.reject();
      }
      res.status(201).json({
        message: 'Success creating new user!',
        user: {
          ...pick(user, [
            '_id',
            'username',
            'email',
            'firstName',
            'lastName',
            'createdAt',
            'updatedAt'
          ]),
          request: {
            type: 'GET',
            url: `http://localhost:5000/users/${user._id}`
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to create new user',
        error: err
      });
    });
});

router.patch('/:userId', async (req, res, next) => {
  let props = pick(req.body, [
    'username',
    'password',
    'email',
    'firstName',
    'lastName'
  ]);
  if (props.password) {
    props.password = await bcrypt.hash(req.body.password, saltRounds);
  }
  props.updatedAt = Date.now();
  let query = req.params.userId;

  User.findByIdAndUpdate(query, { $set: props }, { new: true })
    .select('_id username email firstName lastName createdAt updatedAt role')
    .then(result => {
      res.status(200).json({
        message: 'User successfully updated!',
        user: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Unable to update user',
        error: err
      });
    });
});

router.post('/login', compare, authenticate, async (req, res, next) => {
  res.status(200).json({
    password: req.body.password
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
