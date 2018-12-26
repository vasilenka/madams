const express = require('express');
const router = express.Router();
const pick = require('lodash.pick');
const empty = require('lodash.isempty');
const mongoose = require('mongoose');

let Project = require('./../models/Project');

router.get('/', function(req, res, next) {
  Project.find()
    .select('_id name teams tags startDate endDate createdAt updatedAt')
    .populate('teams')
    .then(projects => {
      if (projects.length === 0) {
        res.status(200).json({
          message: "You don't have any project yet. Create new one!"
        });
      }
      let projectData = projects.map(project => {
        return {
          ...pick(project, [
            '_id',
            'name',
            'teams',
            'status',
            'tags',
            'startDate',
            'endDate',
            'createdAt',
            'updatedAt'
          ])
        };
      });
      res.status(200).json({
        message: 'GET request to the /projects',
        projects: projectData
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message: 'Unable to fetch project',
        error: err
      });
    });
});

router.get('/:projectId', (req, res, next) => {
  let query = req.params.projectId;
  Project.findById(query)
    .select('_id name teams status tags startDate endDate createdAt updatedAt')
    .populate('teams')
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: 'Unable to get project with provided projectId'
        });
      }

      let projectData = pick(project, [
        '_id',
        'name',
        'teams',
        'tags',
        'status',
        'startDate',
        'endDate',
        'createdAt',
        'updatedAt'
      ]);
      res.status(200).json({
        message: 'GET request to project/:projectId',
        project: projectData
      });
    })
    .catch(err => {
      console.log(err);
      res.send(500).json({
        message: 'Unable to fetch project data',
        error: err
      });
    });
});

router.post('/', function(req, res, next) {
  let project = new Project({
    _id: new mongoose.Types.ObjectId(),
    ...pick(req.body, [
      'name',
      'teams',
      'status',
      'tags',
      'startDate',
      'endDate'
    ])
  });

  project
    .save()
    .then(project => {
      if (!project) {
        Promise.reject();
      }
      res.status(200).json({
        message: 'POST request to the /projects',
        project: pick(project, [
          '_id',
          'name',
          'teams',
          'tags',
          'startDate',
          'status',
          'endDate',
          'createdAt',
          'updatedAt'
        ])
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Unable to create projects!',
        error: err
      });
    });
});

router.patch('/:projectId', (req, res, next) => {
  let query = req.params.projectId;
  let projectData = pick(req.body, [
    'name',
    'teams',
    'status',
    'tags',
    'startDate',
    'endDate'
  ]);
  if (empty(projectData)) {
    res.status(304).json({
      message: "No project's data modified",
      project: null
    });
  }
  projectData.updatedAt = Date.now();
  Project.findByIdAndUpdate(query, { $set: projectData }, { new: true })
    .populate('teams')
    .then(project => {
      res.status(200).json({
        message: 'Project data updated successfully!',
        project: project
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Unable to update project's data",
        error: err
      });
    });
});

router.delete('/:projectId', (req, res, next) => {
  let query = req.params.projectId;
  Project.findByIdAndDelete(query)
    .select('_id name teams tags startDate endDate createdAt updatedAt')
    .populate('teams')
    .then(project => {
      res.status(200).json({
        message: 'Project deleted successfully!',
        project: {
          ...pick(project, [
            '_id',
            'name',
            'teams',
            'tags',
            'status',
            'startDate',
            'endDate',
            'createdAt',
            'updatedAt'
          ])
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Unable to delete project',
        error: err
      });
    });
});

module.exports = router;
