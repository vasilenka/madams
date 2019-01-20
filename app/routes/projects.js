const express = require('express');
const router = express.Router();
const pick = require('lodash.pick');
const empty = require('lodash.isempty');
const mongoose = require('mongoose');
// const client = require('../database/connect-redis');
// const { clearHash } = require('./../services/redis-cache');
const tokenAuth = require('../middleware/auth/token-authentication');

let Project = require('./../models/Project');

router.get('/', tokenAuth, async (req, res, next) => {

  let query = { teams: { $elemMatch: { $eq: req.currentUser.id } } }

  Project.find(query)
    // .select(
    //   '_id name status teams tags startDate endDate createdAt updatedAt from'
    // )
    .populate('teams')
    // .cache()
    .then(projects => {
      // if (projects.length === 0) {
      //   return res.status(200).json({
      //     message: "You don't have any project yet. Create new one!"
      //   });
      // }

      // let projectData = projects.map(project => {
      //   return {
      //     ...pick(project, [
      //       '_id',
      //       'shortname',
      //       'name',
      //       'teams',
      //       'status',
      //       'tags',
      //       'startDate',
      //       'endDate',
      //       'createdAt',
      //       'updatedAt'
      //     ])
      //   };
      // });

      res.status(200).send({
        message: 'GET request to the /projects',
        projects: projects
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

router.get('/:projectId', tokenAuth, async (req, res, next) => {

  let query = {
    _id : req.params.projectId,
    teams: { $elemMatch: { $eq: req.currentUser.id } }
  }

  // console.log(query);

  Project.findOne(query)
    // .select('_id name teams status tags startDate endDate createdAt updatedAt from')
    .populate('teams')
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: 'Unable to get project with provided projectId'
        });
        return;
      }

      // let projectData = pick(project, [
      //   '_id',
      //   'name',
      //   'teams',
      //   'tags',
      //   'status',
      //   'from',
      //   'startDate',
      //   'endDate',
      //   'createdAt',
      //   'updatedAt'
      // ]);
      res.status(200).json({
        message: 'GET request to project/:projectId',
        project: project
      });
    })
    .catch(err => {
      console.log(err);
      res.send(500).json({
        message: 'Unable to fetch project data',
        served: 'mongo',
        error: err
      });
    });
});

router.post('/', tokenAuth, async (req, res, next) => {
  let project = new Project({
    // _id: new mongoose.Types.ObjectId(),
    ...pick(req.body, [
      'name',
      'shortname',
      'teams',
      'status',
      'tags',
      'startDate',
      'endDate'
    ])
  });

  try {
    let saved = await project.save();
    if (saved) {
      res.status(200).json({
        message: 'POST request to the /projects',
        project: saved
        // project: pick(saved, [
        //   '_id',
        //   'name',
        //   'shortname',
        //   'teams',
        //   'from',
        //   'tags',
        //   'startDate',
        //   'status',
        //   'endDate',
        //   'createdAt',
        //   'updatedAt'
        // ])
      });
      // clearHash();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Unable to create projects!',
      served: 'mongo',
      error: err
    });
  }
});

router.put('/:projectId', tokenAuth, (req, res, next) => {
  let query = req.params.projectId;
  let projectData = pick(req.body, [
    'name',
    'shortname',
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
    return;
  }
  // projectData.updatedAt = Date.now();
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

router.delete('/:projectId', tokenAuth, (req, res, next) => {

  let query = req.params.projectId;

  console.log(query);

  Project.findByIdAndDelete(query)
    // .select('_id name teams tags startDate endDate createdAt updatedAt')
    .populate('teams')
    .then(project => {

      if(!project) {
        res.status(404).json({
          message: 'Not Found'
        });
        return;
      }

      res.status(200).json({
        message: 'Project deleted successfully!',
        project
        // project: {
        //   ...pick(project, [
        //     '_id',
        //     'name',
        //     'teams',
        //     'tags',
        //     'status',
        //     'startDate',
        //     'endDate',
        //     'createdAt',
        //     'updatedAt'
        //   ])
        // }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Unable to delete project',
        error: err
      });
    });
});

module.exports = router;
