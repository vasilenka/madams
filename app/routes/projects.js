const express = require('express');
const router = express.Router();
const pick = require('lodash.pick');
const mongoose = require('mongoose');

let Project = require('./../models/Project');

router.get('/', function(req, res, next) {
  Project.find()
  .select('_id name teams tags startDate endDate createdAt updatedAt')
  .then(projects => {
    if(projects.length === 0) {
      res.status(200).json({
        message: "You don't have any project yet. Create new one!"
      })
    }
    let projectData = projects.map(project => {
      return {
        ...pick(project, [
          'name',
          'teams',
          'tags',
          'startDate',
          'endDate',
          'createdAt',
          'updatedAt',
        ])
      }
    })
    res.status(200).json({
      message: "GET request to the /projects",
      projects: projectData,
    });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      message: 'Unable to fetch project',
      error: err
    })
  })
});

router.post('/', function(req, res, next) {
  let project = new Project({
    _id: new mongoose.Types.ObjectId,
    ...pick(req.body, [
      'name',
      'teams',
      'tags',
      'startDate',
      'endDate',
    ])
  });

  project.save()
  .then(project => {
    if(!project) {
      Promise.reject();
    }
    res.status(200).json({
      message: "POST request to the /projects",
      project: {
        teams: project.teams.map(team => {
          return {
            teamId: team,
            request: {
              type: 'GET',
              url: `http://localhost:5000/users/${team}`
            }
          }
        }),
        ...pick(project, [
          'name',
          'tags',
          'startDate',
          'endDate',
          'createdAt',
          'updatedAt',
        ])
      },
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Unable to create projects!',
      error: err
    })
  });
});

module.exports = router;
