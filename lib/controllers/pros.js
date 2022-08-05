const { Router } = require('express');
const { Pro } = require('../models/Pro');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const pros = await Pro.getAllPros();
      res.json(pros);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const pros = await Pro.getProById(req.params.id);
      res.json(pros);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const pros = await Pro.insert(req.body);
      res.json(pros);
    } catch (e) {
      next(e);
    }
  });
