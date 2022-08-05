const { Router } = require('express');
const { Course } = require('../models/Course');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const courses = await Course.getAllCourses();
      res.json(courses);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const courses = await Course.getCourseById(req.params.id);
      res.json(courses);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const courses = await Course.insert(req.body);
      res.json(courses);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const courses = await Course.updateById(req.params.id, req.body);
      res.json(courses);
    } catch (e) {
      next(e);
    }
  });
