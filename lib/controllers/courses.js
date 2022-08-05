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
  });
